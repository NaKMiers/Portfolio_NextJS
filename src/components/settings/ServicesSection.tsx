import React from 'react'

import type { Profile } from '@/types/profile'
import Section from '@/components/settings/Section'
import type { IconPickerTarget } from '@/components/settings/types'
import { ghostBtnCls, inputCls, labelCls, secondaryBtnCls, textareaCls } from '@/components/settings/settings-utils'
import { resolveIconFromCode } from '@/utils/iconResolver'

export default function ServicesSection({
  profile,
  setProfile,
  setIconPickerTarget,
}: {
  profile: Profile
  setProfile: React.Dispatch<React.SetStateAction<Profile>>
  setIconPickerTarget: React.Dispatch<React.SetStateAction<IconPickerTarget>>
}) {
  return (
    <Section title='Services' badge='offerings'>
      <div className='space-y-5'>
        <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
          <div className='space-y-2'>
            <label className={labelCls}>Service heading</label>
            <input
              className={inputCls}
              value={profile.serviceHeading}
              onChange={e => setProfile(p => ({ ...p, serviceHeading: e.target.value }))}
            />
          </div>
          <div className='space-y-2'>
            <label className={labelCls}>Service sub-heading</label>
            <input
              className={inputCls}
              value={profile.serviceSubHeading}
              onChange={e => setProfile(p => ({ ...p, serviceSubHeading: e.target.value }))}
            />
          </div>
        </div>

        <div className='space-y-2'>
          <label className={labelCls}>Brief Services (one per line)</label>
          <textarea
            className={textareaCls}
            value={profile.briefServices.join('\n')}
            onChange={e =>
              setProfile(p => ({
                ...p,
                briefServices: e.target.value.split('\n').map(x => x.trim()).filter(Boolean),
              }))
            }
            placeholder='e.g.\nWeb Design\nSEO Optimization\nAI Integration'
          />
        </div>

        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h2 className='text-sm font-semibold'>Services</h2>
            <button
              type='button'
              className={secondaryBtnCls}
              onClick={() =>
                setProfile(p => ({
                  ...p,
                  services: [...p.services, { icon: '', title: '', description: '' }],
                }))
              }
            >
              + Add
            </button>
          </div>

          {profile.services.length === 0 ? <div className='text-xs text-muted-foreground'>No services yet.</div> : null}

          {profile.services.map((sv, idx) => (
            <div key={idx} className='rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4'>
              <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                <div className='space-y-2'>
                  <label className={labelCls}>Icon code</label>
                  <div className='flex items-center gap-2'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-950 text-zinc-100'>
                      {resolveIconFromCode(sv.icon, 18)}
                    </div>
                    <input
                      className={inputCls}
                      value={sv.icon}
                      onChange={e =>
                        setProfile(p => {
                          const next = [...p.services]
                          next[idx] = { ...next[idx], icon: e.target.value }
                          return { ...p, services: next }
                        })
                      }
                      placeholder='e.g. tb:TbBolt'
                    />
                    <button
                      type='button'
                      className={secondaryBtnCls}
                      onClick={() => setIconPickerTarget({ kind: 'service', serviceIndex: idx })}
                    >
                      Pick
                    </button>
                  </div>
                </div>
                <div className='space-y-2'>
                  <label className={labelCls}>Title</label>
                  <input
                    className={inputCls}
                    value={sv.title}
                    onChange={e =>
                      setProfile(p => {
                        const next = [...p.services]
                        next[idx] = { ...next[idx], title: e.target.value }
                        return { ...p, services: next }
                      })
                    }
                  />
                </div>
                <div className='space-y-2 md:col-span-2'>
                  <label className={labelCls}>Description</label>
                  <textarea
                    className={textareaCls}
                    value={sv.description}
                    onChange={e =>
                      setProfile(p => {
                        const next = [...p.services]
                        next[idx] = { ...next[idx], description: e.target.value }
                        return { ...p, services: next }
                      })
                    }
                    placeholder='What this service includes...'
                  />
                </div>
              </div>
              <div className='mt-3 flex justify-end'>
                <button
                  type='button'
                  className={ghostBtnCls}
                  onClick={() => setProfile(p => ({ ...p, services: p.services.filter((_, i) => i !== idx) }))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

