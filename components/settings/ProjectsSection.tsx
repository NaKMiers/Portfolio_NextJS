import React from 'react'

import type { Profile } from '@/types/profile'
import { MAX_UPLOAD_BYTES } from '@/lib/upload-limits'
import Section from '@/components/settings/Section'
import type { UploadingState } from '@/components/settings/types'
import Spinner from '@/components/settings/Spinner'
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
    <Section title='Work & Projects' badge='parts (image, description, link)'>
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
                projects: [...p.projects, { title: '', parts: [] }],
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
              <div className='space-y-3 md:col-span-2'>
                <div className='flex items-center justify-between gap-3'>
                  <div>
                    <label className={labelCls}>Parts</label>
                    <p className='text-xs text-zinc-400'>
                      Each part can have an image, description, and a link. Autoplay slider uses part
                      images.
                    </p>
                  </div>
                  <button
                    type='button'
                    className={secondaryBtnCls}
                    onClick={() =>
                      setProfile(p => {
                        const next = [...p.projects]
                        const cur = next[idx]
                        next[idx] = {
                          ...cur,
                          parts: [...(cur.parts ?? []), { image: '', description: '', link: '' }],
                        }
                        return { ...p, projects: next }
                      })
                    }
                  >
                    + Add part
                  </button>
                </div>

                {(prj.parts ?? []).length === 0 ? (
                  <div className='text-xs text-zinc-500'>No parts yet.</div>
                ) : null}

                <div className='space-y-3'>
                  {(prj.parts ?? []).map((part, partIdx) => (
                    <div key={partIdx} className='rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4'>
                      <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                        <div className='space-y-2'>
                          <div className='flex items-center justify-between gap-3'>
                            <label className={labelCls}>Part image</label>
                            {uploading.projects[idx] ? <Spinner className='text-zinc-300' /> : null}
                          </div>
                          <p className='text-xs text-zinc-400'>
                            Max {MAX_UPLOAD_MB_LABEL} MB. Uploads immediately.
                          </p>
                          <input
                            type='file'
                            accept='image/*'
                            disabled={!!uploading.projects[idx]}
                            className={`${inputCls} file:mr-3 file:rounded-md file:border-0 file:bg-zinc-800 file:px-2.5 file:py-1.5 file:text-xs file:font-medium file:text-zinc-200 hover:file:bg-zinc-700`}
                            onChange={async e => {
                              const file = e.target.files?.[0]
                              e.target.value = ''
                              if (!file) return
                              if (file.size > MAX_UPLOAD_BYTES) {
                                setError(`Each image must be ${MAX_UPLOAD_MB_LABEL} MB or smaller`)
                                return
                              }
                              setError(null)
                              setUploading(u => ({ ...u, projects: { ...u.projects, [idx]: true } }))
                              try {
                                const url = await uploadAssetToCloudinary(file, 'project', idx)
                                setProfile(p => {
                                  const next = [...p.projects]
                                  const cur = next[idx]
                                  const parts = [...(cur.parts ?? [])]
                                  const current = parts[partIdx] ?? {
                                    image: '',
                                    description: '',
                                    link: '',
                                  }
                                  parts[partIdx] = { ...current, image: url }
                                  next[idx] = { ...cur, parts }
                                  return { ...p, projects: next }
                                })
                              } catch (err) {
                                setError(err instanceof Error ? err.message : 'Upload failed')
                              } finally {
                                setUploading(u => ({ ...u, projects: { ...u.projects, [idx]: false } }))
                              }
                            }}
                          />
                          {part.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={part.image}
                              alt={`Part ${partIdx + 1} image`}
                              className='aspect-video w-full rounded-lg border border-zinc-700 object-cover'
                            />
                          ) : (
                            <div className='text-xs text-zinc-500'>No image</div>
                          )}
                        </div>

                        <div className='space-y-2'>
                          <label className={labelCls}>Link</label>
                          <input
                            className={inputCls}
                            value={part.link}
                            onChange={e =>
                              setProfile(p => {
                                const next = [...p.projects]
                                const cur = next[idx]
                                const parts = [...(cur.parts ?? [])]
                                const current = parts[partIdx] ?? {
                                  image: '',
                                  description: '',
                                  link: '',
                                }
                                parts[partIdx] = { ...current, link: e.target.value }
                                next[idx] = { ...cur, parts }
                                return { ...p, projects: next }
                              })
                            }
                            placeholder='https://...'
                          />
                        </div>

                        <div className='space-y-2 md:col-span-2'>
                          <label className={labelCls}>Description</label>
                          <textarea
                            className={textareaCls}
                            value={part.description}
                            onChange={e =>
                              setProfile(p => {
                                const next = [...p.projects]
                                const cur = next[idx]
                                const parts = [...(cur.parts ?? [])]
                                const current = parts[partIdx] ?? {
                                  image: '',
                                  description: '',
                                  link: '',
                                }
                                parts[partIdx] = { ...current, description: e.target.value }
                                next[idx] = { ...cur, parts }
                                return { ...p, projects: next }
                              })
                            }
                            placeholder='What is this part about?'
                          />
                        </div>
                      </div>

                      <div className='mt-3 flex justify-end'>
                        <button
                          type='button'
                          className={ghostBtnCls}
                          onClick={() =>
                            setProfile(p => {
                              const next = [...p.projects]
                              const cur = next[idx]
                              next[idx] = {
                                ...cur,
                                parts: (cur.parts ?? []).filter((_, i) => i !== partIdx),
                              }
                              return { ...p, projects: next }
                            })
                          }
                        >
                          Remove part
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='mt-3 flex justify-between'>
              <button
                type='button'
                className={ghostBtnCls}
                onClick={() =>
                  setProfile(p => {
                    const next = [...p.projects]
                    next[idx] = { ...next[idx], parts: [] }
                    return { ...p, projects: next }
                  })
                }
              >
                Clear parts
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
