'use client'

import React, { useMemo, useState } from 'react'

import AboutSection from '@/components/settings/AboutSection'
import BasicsSection from '@/components/settings/BasicsSection'
import CertificatesSection from '@/components/settings/CertificatesSection'
import EducationSection from '@/components/settings/EducationSection'
import ExperienceSection from '@/components/settings/ExperienceSection'
import IconPickerModal from '@/components/settings/IconPickerModal'
import OwnerAuthGate from '@/components/settings/OwnerAuthGate'
import ProfilePreviewPanel from '@/components/settings/ProfilePreviewPanel'
import ProjectsSection from '@/components/settings/ProjectsSection'
import ServicesSection from '@/components/settings/ServicesSection'
import SettingErrorBanner from '@/components/settings/SettingErrorBanner'
import SettingLoading from '@/components/settings/SettingLoading'
import SettingToolbar from '@/components/settings/SettingToolbar'
import SkillsSection from '@/components/settings/SkillsSection'
import SocialsSection from '@/components/settings/SocialsSection'
import StatsSection from '@/components/settings/StatsSection'
import { cleanProfileForSave } from '@/components/settings/cleanProfileForSave'
import {
  makeMockProfile,
} from '@/components/settings/settings-utils'
import type { IconPickerTarget, UploadingState } from '@/components/settings/types'
import { useApp } from '@/context/AppContext'
import { normalizeProfile } from '@/lib/profile'
import { MAX_PROFILE_JSON_BYTES } from '@/lib/upload-limits'
import type { Profile, ServiceItem } from '@/types/profile'
import { getIconCatalog } from '@/utils/iconResolver'

export default function SettingPage() {
  const { profile: appProfile, setProfile: setAppProfile } = useApp()

  if (!appProfile) return <SettingLoading />

  return <SettingEditor appProfile={appProfile} setAppProfile={setAppProfile} />
}

interface SettingEditorProps {
  appProfile: Profile
  setAppProfile: (profile: Profile) => void
}

function SettingEditor({ appProfile, setAppProfile }: SettingEditorProps) {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState<Profile>(() => normalizeProfile(appProfile))
  const [iconPickerTarget, setIconPickerTarget] = useState<IconPickerTarget>(null)
  const [iconQuery, setIconQuery] = useState('')
  const [uploading, setUploading] = useState<UploadingState>({
    avatar: false,
    background: false,
    cv: false,
    projects: {},
  })

  const preview = useMemo(() => {
    const bg = profile.backgroundImage || ''
    const av = profile.avatar || ''
    return { bg, av }
  }, [profile.backgroundImage, profile.avatar])

  const iconCatalog = useMemo(() => getIconCatalog(), [])
  const filteredIcons = useMemo(() => {
    const q = iconQuery.trim().toLowerCase()
    if (!q) return iconCatalog
    return iconCatalog.filter(
      item => item.code.toLowerCase().includes(q) || item.name.toLowerCase().includes(q)
    )
  }, [iconCatalog, iconQuery])

  async function onSave() {
    setSaving(true)
    setError(null)
    try {
      const body = cleanProfileForSave(profile)
      const json = JSON.stringify(body)

      if (new TextEncoder().encode(json).length > MAX_PROFILE_JSON_BYTES) {
        throw new Error(`Profile data exceeds ${MAX_PROFILE_JSON_BYTES / (1024 * 1024)} MB`)
      }

      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to save profile')
      if (data?.profile) {
        const next = normalizeProfile(data.profile)
        setAppProfile(next)
        setProfile(next)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const updateService = (idx: number, patch: Partial<ServiceItem>) => {
    setProfile(prev => {
      const next = [...prev.services]
      next[idx] = { ...next[idx], ...patch }
      return { ...prev, services: next }
    })
  }

  const applyIconCode = (iconCode: string) => {
    if (!iconPickerTarget) return

    if (iconPickerTarget.kind === 'skill') {
      setProfile(prev => {
        const nextSkills = [...prev.skills]
        const group = nextSkills[iconPickerTarget.groupIndex]
        if (!group) return prev
        const nextItems = [...group.items]
        const currentItem = nextItems[iconPickerTarget.itemIndex]
        if (!currentItem) return prev
        nextItems[iconPickerTarget.itemIndex] = { ...currentItem, icon: iconCode }
        nextSkills[iconPickerTarget.groupIndex] = { ...group, items: nextItems }
        return { ...prev, skills: nextSkills }
      })
    } else if (iconPickerTarget.kind === 'service') {
      updateService(iconPickerTarget.serviceIndex, { icon: iconCode })
    } else if (iconPickerTarget.kind === 'social') {
      setProfile(prev => {
        const next = [...prev.socials]
        const cur = next[iconPickerTarget.socialIndex]
        if (!cur) return prev
        next[iconPickerTarget.socialIndex] = { ...cur, icon: iconCode }
        return { ...prev, socials: next }
      })
    }

    setIconPickerTarget(null)
    setIconQuery('')
  }

  return (
    <OwnerAuthGate>
      <div className='z-50 relative min-h-screen bg-zinc-950/50 text-zinc-100 pt-12'>
        <div className='mx-auto max-w-6xl px-4 py-10'>
          <SettingToolbar
            saving={saving}
            uploading={uploading}
            onFillMock={() => {
              setError(null)
              setProfile(normalizeProfile(makeMockProfile()))
            }}
            onSave={onSave}
          />

          <SettingErrorBanner message={error} />

          <div className='grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]'>
            <div className='space-y-6'>
              <BasicsSection
                profile={profile}
                setProfile={setProfile}
                preview={preview}
                uploading={uploading}
                setUploading={setUploading}
                setError={setError}
              />
              <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                <SocialsSection
                  profile={profile}
                  setProfile={setProfile}
                  setIconPickerTarget={setIconPickerTarget}
                />
                <StatsSection profile={profile} setProfile={setProfile} />
              </div>
              <AboutSection profile={profile} setProfile={setProfile} />
              <SkillsSection
                profile={profile}
                setProfile={setProfile}
                setIconPickerTarget={setIconPickerTarget}
              />
              <ExperienceSection profile={profile} setProfile={setProfile} />
              <EducationSection profile={profile} setProfile={setProfile} />
              <CertificatesSection profile={profile} setProfile={setProfile} />
              <ServicesSection
                profile={profile}
                setProfile={setProfile}
                setIconPickerTarget={setIconPickerTarget}
              />
              <ProjectsSection
                profile={profile}
                setProfile={setProfile}
                setError={setError}
                uploading={uploading}
                setUploading={setUploading}
              />
            </div>

            <ProfilePreviewPanel profile={profile} preview={preview} />
          </div>

          <IconPickerModal
            open={!!iconPickerTarget}
            iconQuery={iconQuery}
            onQueryChange={setIconQuery}
            filteredIcons={filteredIcons}
            onSelect={applyIconCode}
            onClose={() => {
              setIconPickerTarget(null)
              setIconQuery('')
            }}
          />
        </div>
      </div>
    </OwnerAuthGate>
  )
}
