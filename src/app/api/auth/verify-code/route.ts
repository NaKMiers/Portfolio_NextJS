import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import {
  getAuthCookieName,
  getAuthTtlSeconds,
  getOtpCookieName,
  makeAuthToken,
  parseOtpState,
  verifyOtpCode,
} from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { code?: unknown }
  const code = String(body?.code ?? '').trim()
  if (!/^\d{6}$/.test(code)) {
    return NextResponse.json({ error: 'Invalid code' }, { status: 400 })
  }

  const otp = parseOtpState(request.cookies.get(getOtpCookieName())?.value)
  if (!otp) {
    return NextResponse.json(
      { error: 'No code requested (or it expired). Request a new code.' },
      { status: 400 }
    )
  }

  if (Date.now() > otp.exp) {
    return NextResponse.json({ error: 'Code expired. Request a new code.' }, { status: 400 })
  }

  if (!verifyOtpCode(code, otp)) {
    return NextResponse.json({ error: 'Incorrect code' }, { status: 401 })
  }

  const authExpMs = Date.now() + getAuthTtlSeconds() * 1000
  const authToken = makeAuthToken(authExpMs)
  const response = NextResponse.json({ ok: true })

  response.cookies.set({
    name: getOtpCookieName(),
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  response.cookies.set({
    name: getAuthCookieName(),
    value: authToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: getAuthTtlSeconds(),
  })

  return response
}
