import React from 'react'

import type { Profile, SocialLink } from '@/types/profile'
import Section from '@/components/settings/Section'
import { ghostBtnCls, inputCls, labelCls, secondaryBtnCls } from '@/components/settings/settings-utils'

export default function SocialStatsSection({
  profile,
  setProfile,
}: {
  profile: Profile
  setProfile: React.Dispatch<React.SetStateAction<Profile>>
}) {
  const updateSocial = (idx: number, patch: Partial<SocialLink>) => {
    setProfile(p => {
      const next = [...p.socials]
      next[idx] = { ...next[idx], ...patch }
      return { ...p, socials: next }
    })
  }

  const updateStat = (idx: number, patch: Partial<Profile['stats'][number]>) => {
    setProfile(p => {
      const next = [...p.stats]
      next[idx] = { ...next[idx], ...patch }
      return { ...p, stats: next }
    })
  }

  return (
    <Section title='Social Links & Stats' badge='visible on hero'>
      <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
        <div>
          <div className='mb-3 flex items-center justify-between gap-3'>
            <h2 className='text-sm font-semibold'>Socials</h2>
            <button
              type='button'
              className={secondaryBtnCls}
              onClick={() =>
                setProfile(p => ({ ...p, socials: [...p.socials, { name: '', type: '', link: '' }] }))
              }
            >
              + Add
            </button>
          </div>

          <div className='space-y-3'>
            {profile.socials.length === 0 ? (
              <div className='text-xs text-muted-foreground'>No socials yet.</div>
            ) : null}
            {profile.socials.map((s, idx) => (
              <div key={idx} className='rounded-xl border border-zinc-800 bg-zinc-900/50 p-3'>
                <div className='grid grid-cols-1 gap-3'>
                  <div className='space-y-2'>
                    <label className={labelCls}>Display name</label>
                    <input className={inputCls} value={s.name} onChange={e => updateSocial(idx, { name: e.target.value })} />
                  </div>
                  <div className='space-y-2'>
                    <label className={labelCls}>Type (e.g. github)</label>
                    <input className={inputCls} value={s.type} onChange={e => updateSocial(idx, { type: e.target.value })} />
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
                      onClick={() =>
                        setProfile(p => ({ ...p, socials: p.socials.filter((_, i) => i !== idx) }))
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className='mb-3 flex items-center justify-between gap-3'>
            <h2 className='text-sm font-semibold'>Stats</h2>
            <button
              type='button'
              className={secondaryBtnCls}
              onClick={() => setProfile(p => ({ ...p, stats: [...p.stats, { label: '', value: 0 }] }))}
            >
              + Add
            </button>
          </div>

          <div className='space-y-3'>
            {profile.stats.length === 0 ? <div className='text-xs text-muted-foreground'>No stats yet.</div> : null}
            {profile.stats.map((st, idx) => (
              <div key={idx} className='rounded-xl border border-zinc-800 bg-zinc-900/50 p-3'>
                <div className='grid grid-cols-1 gap-3'>
                  <div className='space-y-2'>
                    <label className={labelCls}>Label</label>
                    <input className={inputCls} value={st.label} onChange={e => updateStat(idx, { label: e.target.value })} />
                  </div>
                  <div className='space-y-2'>
                    <label className={labelCls}>Value</label>
                    <input
                      className={inputCls}
                      type='number'
                      value={st.value}
                      onChange={e => updateStat(idx, { value: Number(e.target.value || 0) })}
                    />
                  </div>
                  <div className='flex justify-end'>
                    <button
                      type='button'
                      className={ghostBtnCls}
                      onClick={() =>
                        setProfile(p => ({ ...p, stats: p.stats.filter((_, i) => i !== idx) }))
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
