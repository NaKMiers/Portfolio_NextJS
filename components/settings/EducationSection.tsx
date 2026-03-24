import React from 'react'

import type { Profile, EducationItem } from '@/types/profile'
import Section from '@/components/settings/Section'
import { ghostBtnCls, inputCls, labelCls, secondaryBtnCls } from '@/components/settings/settings-utils'

export default function EducationSection({
  profile,
  setProfile,
}: {
  profile: Profile
  setProfile: React.Dispatch<React.SetStateAction<Profile>>
}) {
  const updateEducation = (idx: number, patch: Partial<EducationItem>) => {
    setProfile(p => {
      const next = [...p.education]
      next[idx] = { ...next[idx], ...patch }
      return { ...p, education: next }
    })
  }

  return (
    <Section title='Education' badge='schooling'>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-sm font-semibold'>Education</h2>
          <button
            type='button'
            className={secondaryBtnCls}
            onClick={() =>
              setProfile(p => ({
                ...p,
                education: [...p.education, { schoolName: '', major: '', start: '', end: '' }],
              }))
            }
          >
            + Add
          </button>
        </div>

        {profile.education.length === 0 ? (
          <div className='text-xs text-muted-foreground'>No education yet.</div>
        ) : null}

        {profile.education.map((ed, idx) => (
          <div key={idx} className='rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4'>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
              <div className='space-y-2'>
                <label className={labelCls}>School</label>
                <input
                  className={inputCls}
                  value={ed.schoolName}
                  onChange={e => updateEducation(idx, { schoolName: e.target.value })}
                />
              </div>
              <div className='space-y-2'>
                <label className={labelCls}>Major</label>
                <input className={inputCls} value={ed.major} onChange={e => updateEducation(idx, { major: e.target.value })} />
              </div>
              <div className='space-y-2'>
                <label className={labelCls}>Start</label>
                <input
                  className={inputCls}
                  type='date'
                  value={ed.start}
                  onChange={e => updateEducation(idx, { start: e.target.value })}
                />
              </div>
              <div className='space-y-2'>
                <label className={labelCls}>End</label>
                <input
                  className={inputCls}
                  type='date'
                  value={ed.end}
                  onChange={e => updateEducation(idx, { end: e.target.value })}
                />
              </div>
            </div>
            <div className='mt-3 flex justify-end'>
              <button
                type='button'
                className={ghostBtnCls}
                onClick={() =>
                  setProfile(p => ({ ...p, education: p.education.filter((_, i) => i !== idx) }))
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
