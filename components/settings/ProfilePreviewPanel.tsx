import React from 'react'

import type { Profile } from '@/types/profile'
import { MAX_UPLOAD_MB_LABEL } from '@/components/settings/settings-utils'

export default function ProfilePreviewPanel({
  profile,
  preview,
}: {
  profile: Profile
  preview: { bg: string; av: string }
}) {
  return (
    <div className='lg:sticky lg:top-10'>
      <div className='overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70'>
        <div
          className='relative h-52'
          style={{
            backgroundImage: preview.bg ? `url(${preview.bg})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: preview.bg ? undefined : '#111827',
          }}
        >
          <div className='absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/60' />
          <div className='absolute left-5 top-5'>
            {preview.av ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview.av}
                alt='Avatar'
                className='h-20 w-20 rounded-full border border-white/20 bg-black/30 object-cover'
              />
            ) : (
              <div className='h-20 w-20 rounded-full border border-white/20 bg-black/30' />
            )}
          </div>
          <div className='absolute bottom-4 left-5 right-5'>
            <div className='text-lg font-semibold text-white'>
              {profile.fullName || profile.username || 'Your Name'}
            </div>
            <div className='text-sm text-white/70'>{profile.jobTitle.join(' • ') || 'Your title'}</div>
          </div>
        </div>

        <div className='space-y-4 p-5'>
          {profile.profileHeading ? (
            <div>
              <div className='text-sm font-semibold'>{profile.profileHeading}</div>
              {profile.profileSubHeading ? (
                <div className='mt-1 text-xs text-zinc-400'>{profile.profileSubHeading}</div>
              ) : null}
            </div>
          ) : null}

          {profile.description ? <div className='text-sm text-zinc-300'>{profile.description}</div> : null}

          {profile.stats.length > 0 ? (
            <div className='grid grid-cols-2 gap-3'>
              {profile.stats.slice(0, 4).map((st, idx) => (
                <div key={idx} className='rounded-xl border border-zinc-800 bg-zinc-900/50 p-3'>
                  <div className='text-lg font-semibold'>{st.value}</div>
                  <div className='text-xs text-zinc-400'>{st.label}</div>
                </div>
              ))}
            </div>
          ) : null}

          {profile.aboutMe ? (
            <div className='rounded-xl border border-zinc-800 bg-zinc-900/50 p-4'>
              <div className='mb-2 text-sm font-semibold'>About</div>
              <div className='text-xs whitespace-pre-wrap text-zinc-400'>
                {profile.aboutMe.slice(0, 240)}
                {profile.aboutMe.length > 240 ? '...' : ''}
              </div>
            </div>
          ) : null}

          {profile.workHeading ? (
            <div className='rounded-xl border border-zinc-800 bg-zinc-900/50 p-4'>
              <div className='mb-2 text-sm font-semibold'>{profile.workHeading}</div>
              <div className='flex flex-wrap gap-2'>
                {profile.projects.slice(0, 4).map((p, idx) => (
                  <span
                    key={idx}
                    className='rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-medium text-cyan-200'
                  >
                    {p.title || `Project ${idx + 1}`}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className='mt-4 text-xs text-zinc-400'>
        Tip: files upload to Cloudinary as you pick them (max {MAX_UPLOAD_MB_LABEL} MB each).{' '}
        <span className='font-medium'>Save profile</span> sends JSON only (URLs + text), under Vercel&apos;s size limit.
      </div>
    </div>
  )
}
