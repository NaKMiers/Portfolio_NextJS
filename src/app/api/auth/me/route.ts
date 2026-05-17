import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getAuthCookieName, verifyAuthToken } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export function GET(request: NextRequest) {
  const ok = verifyAuthToken(request.cookies.get(getAuthCookieName())?.value)
  return NextResponse.json({ ok })
}
