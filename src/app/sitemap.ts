import type { MetadataRoute } from 'next'

import { getPublicProfileUpdatedAt } from '@/lib/profile-data'
import { resolveSiteOrigin } from '@/lib/seo'

export const revalidate = 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = resolveSiteOrigin().replace(/\/$/, '')
  const lm = await getPublicProfileUpdatedAt()

  return [
    {
      url: `${origin}/`,
      lastModified: lm ?? new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
