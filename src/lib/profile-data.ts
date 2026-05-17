import { unstable_cache } from 'next/cache'

import { connectDatabase } from '@/lib/mongodb'
import { PROFILE_DOCUMENT_ID, ProfileModel } from '@/models/Profile'
import type { Profile } from '@/types/profile'

import { makeEmptyProfile, normalizeProfile } from './profile'

export const PUBLIC_PROFILE_CACHE_TAG = 'public-profile'
export const PUBLIC_PROFILE_REVALIDATE_SECONDS = 60

function toClientProfile(doc: Record<string, unknown>) {
  const { _id, createdAt, updatedAt, ...profile } = doc
  return profile
}

class PublicProfileDataError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options)
    this.name = 'PublicProfileDataError'
  }
}

async function readPublicProfileDocument(): Promise<Record<string, unknown> | null> {
  try {
    await connectDatabase()
    const doc = await ProfileModel.findById(PROFILE_DOCUMENT_ID).lean()
    return doc ? (doc as Record<string, unknown>) : null
  } catch (error) {
    console.error('Failed to load public profile from MongoDB.', error)
    throw new PublicProfileDataError('Failed to load public profile from MongoDB.', { cause: error })
  }
}

async function loadPublicProfileUncached(): Promise<Profile> {
  const doc = await readPublicProfileDocument()
  if (!doc) {
    return makeEmptyProfile()
  }

  return normalizeProfile(toClientProfile(doc))
}

export const loadPublicProfile = unstable_cache(loadPublicProfileUncached, ['public-profile'], {
  revalidate: PUBLIC_PROFILE_REVALIDATE_SECONDS,
  tags: [PUBLIC_PROFILE_CACHE_TAG],
})

async function getPublicProfileUpdatedAtUncached(): Promise<Date | null> {
  const doc = await readPublicProfileDocument()
  const raw = doc?.updatedAt
  if (raw instanceof Date) return raw
  if (typeof raw === 'string' || typeof raw === 'number') return new Date(raw)
  return null
}

export const getPublicProfileUpdatedAt = unstable_cache(getPublicProfileUpdatedAtUncached, ['public-profile-updated-at'], {
  revalidate: PUBLIC_PROFILE_REVALIDATE_SECONDS,
  tags: [PUBLIC_PROFILE_CACHE_TAG],
})
