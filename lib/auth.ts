import crypto from 'node:crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

const AUTH_COOKIE = 'portfolio_auth'
const OTP_COOKIE = 'portfolio_otp'

function mustGetSecret(): string {
  const secret = process.env.AUTH_SECRET
  if (!secret) {
    throw new Error('Missing AUTH_SECRET env var')
  }
  return secret
}

function base64url(input: Buffer | Uint8Array | string): string {
  const buf = typeof input === 'string' ? Buffer.from(input) : Buffer.from(input as Uint8Array)
  return buf
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function sign(input: string): string {
  const secret = mustGetSecret()
  const digest = crypto.createHmac('sha256', secret).update(input).digest()
  return base64url(new Uint8Array(digest))
}

export function makeAuthToken(expiresAtMs: number): string {
  const payload = { exp: Math.floor(expiresAtMs / 1000) }
  const body = base64url(JSON.stringify(payload))
  const sig = sign(body)
  return `${body}.${sig}`
}

export function verifyAuthToken(token: string | undefined): boolean {
  if (!token) return false
  const [body, sig] = token.split('.')
  if (!body || !sig) return false

  const expected = sign(body)
  try {
    const a = new Uint8Array(Buffer.from(sig))
    const b = new Uint8Array(Buffer.from(expected))
    if (a.length !== b.length) return false
    if (!crypto.timingSafeEqual(a, b)) return false
  } catch {
    return false
  }

  try {
    const json = Buffer.from(body.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8')
    const parsed = JSON.parse(json) as { exp?: number }
    const exp = typeof parsed.exp === 'number' ? parsed.exp : 0
    return Date.now() < exp * 1000
  } catch {
    return false
  }
}

export function randomCode6(): string {
  const n = crypto.randomInt(0, 1000000)
  return String(n).padStart(6, '0')
}

export function hashOtp(code: string): string {
  const secret = mustGetSecret()
  const digest = crypto.createHmac('sha256', secret).update(code).digest()
  return base64url(new Uint8Array(digest))
}

export function getAuthCookieName() {
  return AUTH_COOKIE
}

export function getOtpCookieName() {
  return OTP_COOKIE
}

export function requireOwnerAuth(req: NextApiRequest, res: NextApiResponse): boolean {
  const ok = verifyAuthToken(req.cookies[AUTH_COOKIE])
  if (!ok) {
    res.status(401).json({ error: 'Unauthorized' })
    return false
  }
  return true
}

