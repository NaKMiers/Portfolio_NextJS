import React from 'react'

import type { Profile, Certificate } from '@/types/profile'
import Section from '@/components/settings/Section'
import { ghostBtnCls, inputCls, labelCls, secondaryBtnCls } from '@/components/settings/settings-utils'

export default function CertificatesSection({
  profile,
  setProfile,
}: {
  profile: Profile
  setProfile: React.Dispatch<React.SetStateAction<Profile>>
}) {
  const updateCertificate = (idx: number, patch: Partial<Certificate>) => {
    setProfile(p => {
      const next = [...p.certificates]
      next[idx] = { ...next[idx], ...patch }
      return { ...p, certificates: next }
    })
  }

  return (
    <Section title='Certificates' badge='links & names'>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-sm font-semibold'>Certificates</h2>
          <button
            type='button'
            className={secondaryBtnCls}
            onClick={() =>
              setProfile(p => ({ ...p, certificates: [...p.certificates, { name: '', link: '' }] }))
            }
          >
            + Add
          </button>
        </div>

        {profile.certificates.length === 0 ? (
          <div className='text-xs text-muted-foreground'>No certificates yet.</div>
        ) : null}

        {profile.certificates.map((c, idx) => (
          <div key={idx} className='rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4'>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
              <div className='space-y-2'>
                <label className={labelCls}>Name</label>
                <input className={inputCls} value={c.name} onChange={e => updateCertificate(idx, { name: e.target.value })} />
              </div>
              <div className='space-y-2'>
                <label className={labelCls}>Link</label>
                <input
                  className={inputCls}
                  value={c.link}
                  onChange={e => updateCertificate(idx, { link: e.target.value })}
                  placeholder='https://...'
                />
              </div>
            </div>
            <div className='mt-3 flex justify-end'>
              <button
                type='button'
                className={ghostBtnCls}
                onClick={() =>
                  setProfile(p => ({ ...p, certificates: p.certificates.filter((_, i) => i !== idx) }))
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
