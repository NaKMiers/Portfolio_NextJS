import crypto from 'node:crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

import { getAuthCookieName, getOtpCookieName, hashOtp, makeAuthToken } from '@/lib/auth'
import { serializeCookie } from '@/lib/cookies'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const code = String((req.body as any)?.code ?? '').trim()
  if (!/^\d{6}$/.test(code)) {
    return res.status(400).json({ error: 'Invalid code' })
  }

  const raw = req.cookies[getOtpCookieName()]
  if (!raw)
    return res.status(400).json({ error: 'No code requested (or it expired). Request a new code.' })

  let otp: { hash: string; exp: number } | null = null
  try {
    otp = JSON.parse(raw)
  } catch {
    otp = null
  }
  if (!otp || typeof otp.hash !== 'string' || typeof otp.exp !== 'number') {
    return res.status(400).json({ error: 'Invalid OTP state. Request a new code.' })
  }
  if (Date.now() > otp.exp) {
    return res.status(400).json({ error: 'Code expired. Request a new code.' })
  }

  const hashed = hashOtp(code)
  try {
    const a = Buffer.from(hashed)
    const b = Buffer.from(otp.hash)
    if (a.length !== b.length || !crypto.timingSafeEqual(a as any, b as any)) {
      return res.status(401).json({ error: 'Incorrect code' })
    }
  } catch {
    return res.status(401).json({ error: 'Incorrect code' })
  }

  const authExpMs = Date.now() + 24 * 60 * 60 * 1000
  const authToken = makeAuthToken(authExpMs)

  res.setHeader('Set-Cookie', [
    // clear otp
    serializeCookie(getOtpCookieName(), '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    }),
    // auth cookie (24h)
    serializeCookie(getAuthCookieName(), authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60,
    }),
  ])

  return res.status(200).json({ ok: true })
}
