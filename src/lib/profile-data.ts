import { connectDatabase } from '@/lib/mongodb'
import { PROFILE_DOCUMENT_ID, ProfileModel } from '@/models/Profile'
import type { Profile } from '@/types/profile'

import { makeEmptyProfile, normalizeProfile } from './profile'

function toClientProfile(doc: Record<string, unknown>) {
  const { _id, createdAt, updatedAt, ...profile } = doc
  return profile
}

export async function loadPublicProfile(): Promise<Profile> {
  try {
    await connectDatabase()
    const doc = await ProfileModel.findById(PROFILE_DOCUMENT_ID).lean()
    if (!doc) {
      return makeEmptyProfile()
    }

    return normalizeProfile(toClientProfile(doc as Record<string, unknown>))
  } catch (error) {
    console.error('Failed to load public profile for prerendering.', error)
    return makeEmptyProfile()
  }
}
