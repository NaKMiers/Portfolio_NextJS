import React, { useMemo, useState } from 'react'

import type { ProjectItem } from '@/types/profile'
import Image from 'next/image'
import Link from 'next/link'
import { BsArrowRight } from 'react-icons/bs'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

function getProjectCoverImage(project: ProjectItem): string | null {
  const parts = Array.isArray(project.parts) ? project.parts : []
  const withImage = parts.find(p => String(p?.image ?? '').trim())
  return withImage ? String(withImage.image) : null
}

export default function WorkSlider({ projects }: { projects: ProjectItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const items = useMemo(() => (Array.isArray(projects) ? projects : []), [projects])
  const slides = useMemo(() => {
    const out: ProjectItem[][] = []
    for (let i = 0; i < items.length; i += 2) out.push(items.slice(i, i + 2))
    return out
  }, [items])
  const activeProject = activeIndex == null ? null : items[activeIndex] ?? null

  if (!items.length) {
    return (
      <div className='rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70'>
        No projects yet.
      </div>
    )
  }

  return (
    <>
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className='w-full pb-10 work-slider'
      >
        {slides.map((slideProjects, slideIdx) => (
          <SwiperSlide key={slideIdx}>
            <div className='flex flex-col gap-4'>
              {slideProjects.map(project => {
                const idx = items.indexOf(project)
                const cover = getProjectCoverImage(project)
                const parts = Array.isArray(project.parts) ? project.parts : []
                const hasMultipleImages = parts.filter(p => String(p?.image ?? '').trim()).length > 1

                return (
                  <button
                    key={`${project.title}-${idx}`}
                    type='button'
                    onClick={() => setActiveIndex(idx)}
                    className='group w-full text-left'
                  >
                    <div className='relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5'>
                      {hasMultipleImages ? (
                        <Swiper
                          className='h-full w-full'
                          slidesPerView={1}
                          loop
                          autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                          }}
                          modules={[Autoplay]}
                        >
                          {parts
                            .filter(p => String(p?.image ?? '').trim())
                            .map((part, partIdx) => (
                              <SwiperSlide key={`${part.image}-${partIdx}`}>
                                <div className='relative h-full w-full'>
                                  <Image
                                    src={part.image}
                                    alt={`${project.title || 'project'} image ${partIdx + 1}`}
                                    fill
                                    className='object-cover'
                                    sizes='(max-width: 1024px) 100vw, 50vw'
                                  />
                                </div>
                              </SwiperSlide>
                            ))}
                        </Swiper>
                      ) : cover ? (
                        <Image
                          src={cover}
                          alt={project.title || 'project image'}
                          fill
                          className='object-cover'
                          sizes='(max-width: 1024px) 100vw, 50vw'
                        />
                      ) : (
                        <div className='absolute inset-0 grid place-items-center text-sm text-white/60'>
                          No image
                        </div>
                      )}

                      <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90' />
                      <div className='absolute bottom-0 left-0 right-0 p-3'>
                        <div className='text-[13px] font-semibold text-white line-clamp-1'>
                          {project.title || 'Untitled'}
                        </div>
                        <div className='mt-0.5 text-[11px] text-white/70'>
                          Tap to view details
                          {parts.length ? ` • ${parts.length} part${parts.length > 1 ? 's' : ''}` : ''}
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .work-slider .swiper-pagination {
          bottom: -10px;
        }
      `}</style>

      {/* Details modal */}
      {activeProject ? (
        <div className='fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4'>
          <div className='w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 text-white shadow-2xl'>
            <div className='flex items-center justify-between gap-3 border-b border-white/10 p-4'>
              <div className='min-w-0'>
                <div className='text-base font-semibold line-clamp-1'>
                  {activeProject.title || 'Untitled project'}
                </div>
                <div className='mt-0.5 text-xs text-white/60'>
                  Swipe images • Descriptions and links below
                </div>
              </div>
              <button
                type='button'
                onClick={() => setActiveIndex(null)}
                className='rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10'
              >
                Close
              </button>
            </div>

            <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-[1.2fr_1fr]'>
              <div className='relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-white/5'>
                <Swiper
                  className='h-full w-full'
                  slidesPerView={1}
                  loop={activeProject.parts.length > 1}
                  autoplay={
                    activeProject.parts.length > 1
                      ? { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }
                      : false
                  }
                  pagination={{ clickable: true }}
                  modules={[Autoplay, Pagination]}
                >
                  {(activeProject.parts ?? []).length ? (
                    activeProject.parts.map((part, partIdx) => (
                      <SwiperSlide key={`${part.image}-${partIdx}`}>
                        <div className='relative h-full w-full'>
                          {part.image ? (
                            <Image
                              src={part.image}
                              alt={`${activeProject.title || 'project'} image ${partIdx + 1}`}
                              fill
                              className='object-cover'
                              sizes='(max-width: 768px) 100vw, 60vw'
                            />
                          ) : (
                            <div className='absolute inset-0 grid place-items-center text-sm text-white/60'>
                              No image
                            </div>
                          )}
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    <SwiperSlide>
                      <div className='absolute inset-0 grid place-items-center text-sm text-white/60'>
                        No parts
                      </div>
                    </SwiperSlide>
                  )}
                </Swiper>
              </div>

              <div className='space-y-3'>
                {(activeProject.parts ?? []).length ? (
                  activeProject.parts.map((part, partIdx) => (
                    <div key={partIdx} className='rounded-xl border border-white/10 bg-white/5 p-3'>
                      <div className='flex items-start justify-between gap-3'>
                        <div className='w-3 h-3 rounded-full bg-accent' />
                        {part.link ? (
                          <Link
                            href={part.link}
                            target='_blank'
                            className='inline-flex items-center gap-2 text-xs font-medium text-sky-300 hover:underline underline-offset-2'
                            onClick={e => e.stopPropagation()}
                          >
                            Open <BsArrowRight className='text-base' />
                          </Link>
                        ) : null}
                      </div>
                      {part.description ? (
                        <div className='mt-2 text-sm text-white/80 whitespace-pre-wrap'>
                          {part.description}
                        </div>
                      ) : (
                        <div className='mt-2 text-sm text-white/50'>No description</div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className='rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/60'>
                    No parts for this project yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
