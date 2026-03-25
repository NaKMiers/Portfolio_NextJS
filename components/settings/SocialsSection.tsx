import React from 'react'

import type { Profile, SocialLink } from '@/types/profile'
import Section from '@/components/settings/Section'
import type { IconPickerTarget } from '@/components/settings/types'
import { ghostBtnCls, inputCls, labelCls, secondaryBtnCls } from '@/components/settings/settings-utils'
import { resolveIconFromCode } from '@/utils/iconResolver'

export default function SocialsSection({
  profile,
  setProfile,
  setIconPickerTarget,
}: {
  profile: Profile
  setProfile: React.Dispatch<React.SetStateAction<Profile>>
  setIconPickerTarget: React.Dispatch<React.SetStateAction<IconPickerTarget>>
}) {
  const updateSocial = (idx: number, patch: Partial<SocialLink>) => {
    setProfile(p => {
      const next = [...p.socials]
      next[idx] = { ...next[idx], ...patch }
      return { ...p, socials: next }
    })
  }

  return (
    <Section title='Social Links' badge='icons + links'>
      <div className='mb-3 flex items-center justify-between gap-3'>
        <h2 className='text-sm font-semibold'>Socials</h2>
        <button
          type='button'
          className={secondaryBtnCls}
          onClick={() => setProfile(p => ({ ...p, socials: [...p.socials, { name: '', icon: '', link: '' }] }))}
        >
          + Add
        </button>
      </div>

      <div className='space-y-3'>
        {profile.socials.length === 0 ? <div className='text-xs text-muted-foreground'>No socials yet.</div> : null}
        {profile.socials.map((s, idx) => (
          <div key={idx} className='rounded-xl border border-zinc-800 bg-zinc-900/50 p-3'>
            <div className='grid grid-cols-1 gap-3'>
              <div className='space-y-2'>
                <label className={labelCls}>Display name</label>
                <input className={inputCls} value={s.name} onChange={e => updateSocial(idx, { name: e.target.value })} />
              </div>

              <div className='space-y-2'>
                <label className={labelCls}>Icon code</label>
                <div className='flex items-center gap-2'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-950 text-zinc-100'>
                    {s.icon ? resolveIconFromCode(s.icon, 18) : null}
                  </div>
                  <input
                    className={inputCls}
                    value={s.icon}
                    onChange={e => updateSocial(idx, { icon: e.target.value })}
                    placeholder='e.g. fa:FaGithub'
                  />
                  <button
                    type='button'
                    className={secondaryBtnCls}
                    onClick={() => setIconPickerTarget({ kind: 'social', socialIndex: idx })}
                  >
                    Pick
                  </button>
                </div>
              </div>

              <div className='space-y-2'>
                <label className={labelCls}>Link</label>
                <input
                  className={inputCls}
                  value={s.link}
                  onChange={e => updateSocial(idx, { link: e.target.value })}
                  placeholder='https://...'
                />
              </div>

              <div className='flex justify-end'>
                <button
                  type='button'
                  className={ghostBtnCls}
                  onClick={() => setProfile(p => ({ ...p, socials: p.socials.filter((_, i) => i !== idx) }))}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

