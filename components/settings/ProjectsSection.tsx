import React from 'react'

import type { Profile } from '@/types/profile'
import { MAX_UPLOAD_BYTES } from '@/lib/upload-limits'
import Section from '@/components/settings/Section'
import type { UploadingState } from '@/components/settings/types'
import {
  MAX_UPLOAD_MB_LABEL,
  ghostBtnCls,
  inputCls,
  labelCls,
  secondaryBtnCls,
  textareaCls,
  uploadAssetToCloudinary,
} from '@/components/settings/settings-utils'

export default function ProjectsSection({
  profile,
  setProfile,
  setError,
  uploading,
  setUploading,
}: {
  profile: Profile
  setProfile: React.Dispatch<React.SetStateAction<Profile>>
  setError: React.Dispatch<React.SetStateAction<string | null>>
  uploading: UploadingState
  setUploading: React.Dispatch<React.SetStateAction<UploadingState>>
}) {
  return (
    <Section title='Work & Projects' badge='images + links'>
      <div className='space-y-5'>
        <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
          <div className='space-y-2'>
            <label className={labelCls}>Work heading</label>
            <input
              className={inputCls}
              value={profile.workHeading}
              onChange={e => setProfile(p => ({ ...p, workHeading: e.target.value }))}
            />
          </div>
          <div className='space-y-2'>
            <label className={labelCls}>Work sub-heading</label>
            <input
              className={inputCls}
              value={profile.workSubHeading}
              onChange={e => setProfile(p => ({ ...p, workSubHeading: e.target.value }))}
            />
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <h2 className='text-sm font-semibold'>Projects</h2>
          <button
            type='button'
            className={secondaryBtnCls}
            onClick={() =>
              setProfile(p => ({
                ...p,
                projects: [...p.projects, { title: '', images: [], description: '', links: [] }],
              }))
            }
          >
            + Add project
          </button>
        </div>

        {profile.projects.length === 0 ? (
          <div className='text-xs text-muted-foreground'>No projects yet.</div>
        ) : null}

        {profile.projects.map((prj, idx) => (
          <div key={idx} className='rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4'>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
              <div className='space-y-2 md:col-span-2'>
                <label className={labelCls}>Title</label>
                <input
                  className={inputCls}
                  value={prj.title}
                  onChange={e =>
                    setProfile(p => {
                      const next = [...p.projects]
                      next[idx] = { ...next[idx], title: e.target.value }
                      return { ...p, projects: next }
                    })
                  }
                  placeholder='Project title'
                />
              </div>
              <div className='space-y-2'>
                <label className={labelCls}>Description</label>
                <textarea
                  className={textareaCls}
                  value={prj.description}
                  onChange={e =>
                    setProfile(p => {
                      const next = [...p.projects]
                      next[idx] = { ...next[idx], description: e.target.value }
                      return { ...p, projects: next }
                    })
                  }
                  placeholder='Short description...'
                />
              </div>
              <div className='space-y-2'>
                <label className={labelCls}>Links (one per line)</label>
                <textarea
                  className={textareaCls}
                  value={prj.links.join('\n')}
                  onChange={e =>
                    setProfile(p => {
                      const next = [...p.projects]
                      next[idx] = {
                        ...next[idx],
                        links: e.target.value
                          .split('\n')
                          .map(x => x.trim())
                          .filter(Boolean),
                      }
                      return { ...p, projects: next }
                    })
                  }
                  placeholder='https://demo...\nhttps://github...'
                />
              </div>

              <div className='space-y-2 md:col-span-2'>
                <label className={labelCls}>Images</label>
                <p className='text-xs text-zinc-400'>
                  Max {MAX_UPLOAD_MB_LABEL} MB per file. Each batch uploads to Cloudinary immediately and
                  appends URLs.
                </p>
                <input
                  type='file'
                  accept='image/*'
                  multiple
                  disabled={!!uploading.projects[idx]}
                  className={`${inputCls} file:mr-3 file:rounded-md file:border-0 file:bg-zinc-800 file:px-2.5 file:py-1.5 file:text-xs file:font-medium file:text-zinc-200 hover:file:bg-zinc-700`}
                  onChange={async e => {
                    const files = Array.from(e.target.files ?? [])
                    e.target.value = ''
                    if (files.length === 0) return
                    for (const f of files) {
                      if (f.size > MAX_UPLOAD_BYTES) {
                        setError(`Each image must be ${MAX_UPLOAD_MB_LABEL} MB or smaller`)
                        return
                      }
                    }
                    setError(null)
                    setUploading(u => ({ ...u, projects: { ...u.projects, [idx]: true } }))
                    try {
                      const urls: string[] = []
                      for (const file of files) {
                        urls.push(await uploadAssetToCloudinary(file, 'project', idx))
                      }
                      setProfile(p => {
                        const next = [...p.projects]
                        const cur = next[idx]
                        next[idx] = { ...cur, images: [...(cur.images ?? []), ...urls] }
                        return { ...p, projects: next }
                      })
                    } catch (err) {
                      setError(err instanceof Error ? err.message : 'Upload failed')
                    } finally {
                      setUploading(u => ({ ...u, projects: { ...u.projects, [idx]: false } }))
                    }
                  }}
                />
                {uploading.projects[idx] ? <p className='text-xs text-zinc-400'>Uploading...</p> : null}
                {prj.images.length > 0 ? (
                  <div className='mt-3 flex flex-wrap gap-2'>
                    {prj.images.slice(0, 6).map((url, imgIdx) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={imgIdx}
                        src={url}
                        alt={`Project image ${imgIdx + 1}`}
                        className='h-16 w-16 rounded-lg border border-zinc-700 object-cover'
                      />
                    ))}
                  </div>
                ) : (
                  <div className='mt-1 text-xs text-zinc-500'>No images yet.</div>
                )}
              </div>
            </div>

            <div className='mt-3 flex justify-between'>
              <button
                type='button'
                className={ghostBtnCls}
                onClick={() =>
                  setProfile(p => {
                    const next = [...p.projects]
                    next[idx] = { ...next[idx], images: [] }
                    return { ...p, projects: next }
                  })
                }
              >
                Clear images
              </button>
              <button
                type='button'
                className={ghostBtnCls}
                onClick={() =>
                  setProfile(p => ({ ...p, projects: p.projects.filter((_, i) => i !== idx) }))
                }
              >
                Remove project
              </button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
