import React from 'react'

import { MAX_UPLOAD_MB_LABEL } from '@/components/settings/settings-utils'
import type { Profile } from '@/types/profile'

export default function ProfilePreviewPanel({
  profile,
  preview,
}: {
  profile: Profile
  preview: { bg: string; av: string }
}) {
  const displayTitles = profile.jobTitle.filter(Boolean).join(' / ')

  return (
    <div className='lg:sticky lg:top-10'>
      <div className='overflow-hidden rounded-[1.9rem] border border-pp-line bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,250,246,0.7))] shadow-panel backdrop-blur-md'>
        <div
          className='relative h-60'
          style={{
            backgroundImage: preview.bg ? `url(${preview.bg})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: preview.bg ? undefined : '#f4ece2',
          }}
        >
          <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(26,23,21,0.08),transparent_36%,rgba(26,23,21,0.5))]' />
          <div className='absolute left-5 top-5 rounded-full border border-white/70 bg-white/82 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-pp-text shadow-[0_14px_28px_rgba(46,35,28,0.14)] backdrop-blur-md'>
            Live preview
          </div>
          <div className='absolute left-5 top-16'>
            {preview.av ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview.av}
                alt='Avatar'
                className='h-24 w-24 rounded-full border border-white/80 bg-white/50 object-cover shadow-[0_18px_36px_rgba(17,17,17,0.22)]'
              />
            ) : (
              <div className='h-24 w-24 rounded-full border border-white/80 bg-white/50 shadow-[0_18px_36px_rgba(17,17,17,0.18)]' />
            )}
          </div>
          <div className='absolute bottom-5 left-5 right-5'>
            <div className='font-display text-2xl font-semibold tracking-tight text-white'>
              {profile.fullName || profile.username || 'Your Name'}
            </div>
            <div className='mt-1 text-sm font-medium text-white/75'>{displayTitles || 'Your title'}</div>
          </div>
        </div>

        <div className='space-y-4 p-5 sm:p-6'>
          {profile.profileHeading ? (
            <div>
              <div className='text-[11px] font-semibold uppercase tracking-[0.16em] text-pp-muted'>
                Headline
              </div>
              <div className='mt-1 font-display text-xl font-semibold tracking-tight text-pp-text'>
                {profile.profileHeading}
              </div>
              {profile.profileSubHeading ? (
                <div className='mt-2 text-sm leading-relaxed text-pp-muted'>{profile.profileSubHeading}</div>
              ) : null}
            </div>
          ) : null}

          {profile.description ? <div className='text-sm leading-relaxed text-pp-muted'>{profile.description}</div> : null}

          {profile.stats.length > 0 ? (
            <div className='grid grid-cols-2 gap-3'>
              {profile.stats.slice(0, 4).map((st, idx) => (
                <div
                  key={idx}
                  className='rounded-[1.15rem] border border-pp-line bg-white/74 p-3 shadow-[0_12px_24px_rgba(46,35,28,0.05)]'
                >
                  <div className='font-display text-2xl font-semibold tracking-tight text-pp-text'>
                    {st.value}
                  </div>
                  <div className='text-[11px] font-semibold uppercase tracking-[0.14em] text-pp-muted'>
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {profile.aboutMe ? (
            <div className='rounded-[1.2rem] border border-pp-line bg-white/72 p-4 shadow-[0_12px_24px_rgba(46,35,28,0.05)]'>
              <div className='mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-pp-muted'>
                About
              </div>
              <div className='text-sm whitespace-pre-wrap text-pp-muted'>
                {profile.aboutMe.slice(0, 240)}
                {profile.aboutMe.length > 240 ? '...' : ''}
              </div>
            </div>
          ) : null}

          {profile.workHeading ? (
            <div className='rounded-[1.2rem] border border-pp-line bg-white/72 p-4 shadow-[0_12px_24px_rgba(46,35,28,0.05)]'>
              <div className='mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-pp-muted'>
                Work section
              </div>
              <div className='mb-3 font-display text-lg font-semibold tracking-tight text-pp-text'>
                {profile.workHeading}
              </div>
              <div className='flex flex-wrap gap-2'>
                {profile.projects.slice(0, 4).map((p, idx) => (
                  <span
                    key={idx}
                    className='rounded-full border border-pp-line bg-white/82 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-pp-text'
                  >
                    {p.title || `Project ${idx + 1}`}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className='mt-4 rounded-[1.3rem] border border-pp-line bg-white/62 px-4 py-3 text-xs leading-relaxed text-pp-muted shadow-[0_12px_24px_rgba(46,35,28,0.05)] backdrop-blur-sm'>
        Tip: files upload to Cloudinary as you pick them (max {MAX_UPLOAD_MB_LABEL} MB each).{' '}
        <span className='font-semibold text-pp-text'>Save profile</span> still sends JSON only, which keeps
        the payload well under Vercel&apos;s request size limit.
      </div>
    </div>
  )
}
