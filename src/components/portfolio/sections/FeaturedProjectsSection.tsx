import {
  PortfolioExternalLink,
  ProjectStoryCard,
  ProjectStoryMedia,
  SectionFrame,
} from '@/components/portfolio/primitives'
import { collapseWhitespace, excerptText, projectOutboundLinks, trimText } from '@/lib/profile-copy'
import type { ProjectsBandViewModel } from '@/lib/profile-view-model'
import type { ProjectItem } from '@/types/profile'

function storyCopy(project: ProjectItem) {
  const descs = project.parts.map(p => collapseWhitespace(p.description)).filter(Boolean)
  if (!descs.length) return null
  const [first, ...rest] = descs
  const lead = first.length > 360 ? excerptText(first, 360) : first
  return (
    <div className='space-y-3'>
      <p className='text-pp-text/90'>{lead}</p>
      {rest.length ? (
        <ul className='list-disc space-y-1.5 pl-5 marker:text-pp-muted'>
          {rest.slice(0, 4).map((t, i) => (
            <li key={`${i}-${t.slice(0, 24)}`}>{t.length > 200 ? excerptText(t, 200) : t}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

function FeaturedProjectArticle({
  project,
  index,
}: {
  project: ProjectItem
  /** Display index (deterministic array order). */
  index: number
}) {
  const title = collapseWhitespace(project.title) || 'Project'
  const imageCount = project.parts.filter(p => trimText(p.image).length > 0).length
  const spotlight = index === 0 && imageCount >= 2
  const ctas = projectOutboundLinks(project)

  return (
    <article>
      <ProjectStoryCard
        meta={`Featured work · ${String(index + 1).padStart(2, '0')}`}
        title={title}
        visual={
          <ProjectStoryMedia
            projectTitle={title}
            parts={project.parts}
            layout={spotlight ? 'spotlight' : 'hero-strip'}
            priority={index === 0}
          />
        }
      >
        <div className='space-y-4'>
          <div className='rounded-[1.2rem] border border-pp-line/80 bg-white/72 px-4 py-3 shadow-[0_10px_24px_rgba(46,35,28,0.05)]'>
            <p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-pp-muted'>Overview</p>
            <p className='mt-1 text-sm font-medium leading-relaxed text-pp-text'>
              {title}
            </p>
          </div>
          {storyCopy(project)}
          {ctas.length ? (
            <div className='flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center'>
              {ctas.map(({ url, label }) => (
                <PortfolioExternalLink
                  key={url}
                  href={url}
                  className='inline-flex min-h-[44px] items-center justify-center rounded-full bg-pp-text px-5 py-2.5 text-center text-sm font-semibold text-white shadow-[0_14px_32px_rgba(17,17,17,0.16)] motion-safe:transition-[transform,box-shadow] motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_20px_36px_rgba(17,17,17,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pp-blue'
                >
                  {label}
                </PortfolioExternalLink>
              ))}
            </div>
          ) : null}
        </div>
      </ProjectStoryCard>
    </article>
  )
}

type FeaturedProjectsSectionProps = {
  /** Derived band - project order matches sanitized DB order. */
  featured: ProjectsBandViewModel
}

export default function FeaturedProjectsSection({ featured }: FeaturedProjectsSectionProps) {
  const heading = featured.heading || 'Selected work'
  const sub = featured.subheading

  return (
    <SectionFrame
      id='work'
      aria-labelledby='work-heading'
      className='border-b border-pp-line scroll-mt-24 md:scroll-mt-28'
    >
      <div className='mb-10 max-w-2xl space-y-3'>
        <h2
          id='work-heading'
          className='font-display text-[clamp(1.75rem,3.5vw,2.25rem)] font-semibold tracking-tight text-pp-text'
        >
          {heading}
        </h2>
        {sub ? (
          <p className='font-display text-base font-medium leading-relaxed text-pp-muted md:text-lg'>{sub}</p>
        ) : null}
      </div>

      {featured.projects.length ? (
        <div className='space-y-12 md:space-y-14'>
          {featured.projects.map((project, index) => (
            <FeaturedProjectArticle
              key={`featured-story-${index}`}
              project={project}
              index={index}
            />
          ))}
        </div>
      ) : null}
    </SectionFrame>
  )
}
