import React from 'react'

import type { Profile, ExperienceItem } from '@/types/profile'
import Section from '@/components/settings/Section'
import { ghostBtnCls, inputCls, labelCls, secondaryBtnCls } from '@/components/settings/settings-utils'

export default function ExperienceSection({
  profile,
  setProfile,
}: {
  profile: Profile
  setProfile: React.Dispatch<React.SetStateAction<Profile>>
}) {
  const updateExperience = (idx: number, patch: Partial<ExperienceItem>) => {
    setProfile(p => {
      const next = [...p.experience]
      next[idx] = { ...next[idx], ...patch }
      return { ...p, experience: next }
    })
  }

  return (
    <Section title='Experience' badge='work history'>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-sm font-semibold'>Experience</h2>
          <button
            type='button'
            className={secondaryBtnCls}
            onClick={() =>
              setProfile(p => ({
                ...p,
                experience: [...p.experience, { companyName: '', position: '', start: '', end: '' }],
              }))
            }
          >
            + Add
          </button>
        </div>

        {profile.experience.length === 0 ? (
          <div className='text-xs text-muted-foreground'>No experience yet.</div>
        ) : null}

        {profile.experience.map((exp, idx) => (
          <div key={idx} className='rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4'>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
              <div className='space-y-2'>
                <label className={labelCls}>Company name</label>
                <input
                  className={inputCls}
                  value={exp.companyName}
                  onChange={e => updateExperience(idx, { companyName: e.target.value })}
                />
              </div>
              <div className='space-y-2'>
                <label className={labelCls}>Position</label>
                <input
                  className={inputCls}
                  value={exp.position}
                  onChange={e => updateExperience(idx, { position: e.target.value })}
                />
              </div>
              <div className='space-y-2'>
                <label className={labelCls}>Start</label>
                <input
                  className={inputCls}
                  type='date'
                  value={exp.start}
                  onChange={e => updateExperience(idx, { start: e.target.value })}
                />
              </div>
              <div className='space-y-2'>
                <label className={labelCls}>End</label>
                <input
                  className={inputCls}
                  type='date'
                  value={exp.end}
                  onChange={e => updateExperience(idx, { end: e.target.value })}
                />
              </div>
            </div>
            <div className='mt-3 flex justify-end'>
              <button
                type='button'
                className={ghostBtnCls}
                onClick={() =>
                  setProfile(p => ({ ...p, experience: p.experience.filter((_, i) => i !== idx) }))
                }
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
