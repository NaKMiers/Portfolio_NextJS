import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getAuthCookieName, verifyAuthToken } from '@/lib/auth'
import { connectDatabase } from '@/lib/mongodb'
import { sendMail } from '@/lib/mailer'
import { PROFILE_DOCUMENT_ID, ProfileModel } from '@/models/Profile'
import { getRequiredEnv } from '@/lib/required-env'
import { MAX_PROFILE_JSON_BYTES } from '@/lib/upload-limits'
import type { Profile } from '@/types/profile'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function toClientProfile(doc: Record<string, unknown>) {
  const { _id, createdAt, updatedAt, ...profile } = doc
  return profile
}

function jsonError(error: string, status: number) {
  return NextResponse.json({ error }, { status })
}

export async function GET() {
  try {
    await connectDatabase()
    const doc = await ProfileModel.findById(PROFILE_DOCUMENT_ID).lean()
    if (!doc) {
      return NextResponse.json({ profile: null })
    }

    return NextResponse.json({
      profile: toClientProfile(doc as Record<string, unknown>),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown server error'
    return jsonError(message, 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDatabase()

    const authCookie = request.cookies.get(getAuthCookieName())?.value
    if (!verifyAuthToken(authCookie)) {
      return jsonError('Unauthorized', 401)
    }

    const contentType = request.headers.get('content-type') ?? ''
    if (!contentType.includes('application/json')) {
      return jsonError('Expected Content-Type: application/json', 415)
    }

    const raw = await request.text()
    const byteLength = new TextEncoder().encode(raw).length
    if (byteLength > MAX_PROFILE_JSON_BYTES) {
      return jsonError(`Profile JSON exceeds ${MAX_PROFILE_JSON_BYTES / (1024 * 1024)} MB`, 413)
    }

    const parsed = JSON.parse(raw || '{}') as Profile
    const now = new Date()
    const updatedDoc = await ProfileModel.findOneAndUpdate(
      { _id: PROFILE_DOCUMENT_ID },
      {
        $set: {
          ...parsed,
          updatedAt: now,
        },
        $setOnInsert: {
          _id: PROFILE_DOCUMENT_ID,
          createdAt: now,
        },
      },
      { upsert: true, new: true, lean: true, runValidators: true }
    )

    if (!updatedDoc) {
      return jsonError('Failed to load updated profile', 500)
    }

    const summary = `Updated profile: ${parsed.fullName || parsed.username || '-'} (${
      Array.isArray(parsed.jobTitle) ? parsed.jobTitle.join(', ') || '-' : '-'
    }) at ${now.toISOString()}`

    try {
      await sendMail(
        getRequiredEnv('MAIL_TO'),
        'Portfolio Updated',
        `
          <div>
            <h1>Portfolio Updated</h1>
            <p>Summary: ${summary}</p>
          </div>
        `
      )
    } catch {
      // Ignore mail failures
    }

    return NextResponse.json({
      ok: true,
      profile: toClientProfile(updatedDoc as Record<string, unknown>),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown server error'
    return jsonError(message, 500)
  }
}
