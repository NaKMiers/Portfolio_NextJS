'use client'

import React, { useEffect, useMemo, useState } from 'react'

import type { Profile, ServiceItem } from '@/types/profile'
import { MAX_PROFILE_JSON_BYTES } from '@/lib/upload-limits'
import { getIconCatalog } from '@/utils/iconResolver'
import { useApp } from '@/context/AppContext'
import IconPickerModal from '@/components/settings/IconPickerModal'
import SkillsSection from '@/components/settings/SkillsSection'
import ServicesSection from '@/components/settings/ServicesSection'
import ProjectsSection from '@/components/settings/ProjectsSection'
import SettingLoading from '@/components/settings/SettingLoading'
import SettingToolbar from '@/components/settings/SettingToolbar'
import SettingErrorBanner from '@/components/settings/SettingErrorBanner'
import BasicsSection from '@/components/settings/BasicsSection'
import SocialsSection from '@/components/settings/SocialsSection'
import StatsSection from '@/components/settings/StatsSection'
import AboutSection from '@/components/settings/AboutSection'
import ExperienceSection from '@/components/settings/ExperienceSection'
import EducationSection from '@/components/settings/EducationSection'
import CertificatesSection from '@/components/settings/CertificatesSection'
import ProfilePreviewPanel from '@/components/settings/ProfilePreviewPanel'
import {
  makeEmptyProfile,
  makeMockProfile,
  normalizeProfile,
} from '@/components/settings/settings-utils'
import type { IconPickerTarget, UploadingState } from '@/components/settings/types'
import { cleanProfileForSave } from '@/components/settings/cleanProfileForSave'

function Setting() {
  const { profile: appProfile, setProfile: setAppProfile } = useApp()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState<Profile>(() => makeEmptyProfile())
  const [iconPickerTarget, setIconPickerTarget] = useState<IconPickerTarget>(null)
  const [iconQuery, setIconQuery] = useState('')

  const [uploading, setUploading] = useState<UploadingState>({
    avatar: false,
    background: false,
    cv: false,
    projects: {},
  })

  useEffect(() => {
    // Hydrate editor state from app-level profile (already fetched by AppProvider).
    if (!appProfile) return
    setProfile(normalizeProfile(appProfile))
    setLoading(false)
  }, [appProfile])

  useEffect(() => {
    // If profile doesn't exist yet, show loading state.
    setLoading(appProfile == null)
  }, [appProfile])

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
    setProfile(p => {
      const next = [...p.services]
      next[idx] = { ...next[idx], ...patch }
      return { ...p, services: next }
    })
  }

  const applyIconCode = (iconCode: string) => {
    if (!iconPickerTarget) return

    if (iconPickerTarget.kind === 'skill') {
      setProfile(p => {
        const nextSkills = [...p.skills]
        const group = nextSkills[iconPickerTarget.groupIndex]
        if (!group) return p
        const nextItems = [...group.items]
        const currentItem = nextItems[iconPickerTarget.itemIndex]
        if (!currentItem) return p
        nextItems[iconPickerTarget.itemIndex] = { ...currentItem, icon: iconCode }
        nextSkills[iconPickerTarget.groupIndex] = { ...group, items: nextItems }
        return { ...p, skills: nextSkills }
      })
    } else if (iconPickerTarget.kind === 'service') {
      updateService(iconPickerTarget.serviceIndex, { icon: iconCode })
    } else if (iconPickerTarget.kind === 'social') {
      setProfile(p => {
        const next = [...p.socials]
        const cur = next[iconPickerTarget.socialIndex]
        if (!cur) return p
        next[iconPickerTarget.socialIndex] = { ...cur, icon: iconCode }
        return { ...p, socials: next }
      })
    }

    setIconPickerTarget(null)
    setIconQuery('')
  }

  if (loading) return <SettingLoading />

  return (
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
            <SocialsSection
              profile={profile}
              setProfile={setProfile}
              setIconPickerTarget={setIconPickerTarget}
            />
            <StatsSection profile={profile} setProfile={setProfile} />
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
  )
}

export default Setting
