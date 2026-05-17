import type { ProjectPart } from '@/types/profile'

import { ProjectImageCarousel, type ProjectCarouselSlide } from './ProjectImageCarousel'

export type ProjectStoryMediaProps = {
  projectTitle: string
  parts: ProjectPart[]
  /** First project's first paint */
  priority?: boolean
  /**
   * `spotlight`: slightly taller for hero projects.
   * `hero-strip`: standard featured project media.
   */
  layout: 'spotlight' | 'hero-strip'
}

function slidesFromParts(projectTitle: string, parts: ProjectPart[]): ProjectCarouselSlide[] {
  const baseTitle = projectTitle.trim() || 'Project'

  return parts
    .map((part, index) => ({
      src: part.image.trim(),
      alt: `${baseTitle} - preview ${index + 1}`,
      caption: part.description.trim() || undefined,
    }))
    .filter(slide => slide.src.length > 0)
}

/**
 * Auto-sliding project media with optional per-image captions.
 * Featured work now uses a true carousel instead of a static strip so multi-image projects read clearly.
 */
export function ProjectStoryMedia({ projectTitle, parts, priority, layout }: ProjectStoryMediaProps) {
  const slides = slidesFromParts(projectTitle, parts)

  if (!slides.length) {
    return (
      <div className='flex min-h-[140px] items-center justify-center border-b border-pp-line bg-pp-bg/40 px-6 py-10'>
        <p className='text-center text-sm text-pp-muted'>Visuals for this story are unavailable.</p>
      </div>
    )
  }

  return (
    <div className='border-b border-pp-line bg-pp-bg/25 p-3 sm:p-4'>
      <ProjectImageCarousel
        slides={slides}
        priority={priority}
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 88vw, 920px'
        aspectClassName={layout === 'spotlight' ? 'aspect-[16/10] md:aspect-[16/9]' : 'aspect-[16/10]'}
        chrome='feature'
      />
    </div>
  )
}
