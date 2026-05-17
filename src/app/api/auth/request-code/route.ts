import { NextResponse } from 'next/server'

import { getOtpCookieName, getOtpTtlSeconds, hashOtp, randomCode6 } from '@/lib/auth'
import { sendMail } from '@/lib/mailer'
import { getRequiredEnv } from '@/lib/required-env'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const code = randomCode6()
    const otp = {
      hash: hashOtp(code),
      exp: Date.now() + getOtpTtlSeconds() * 1000,
    }

    await sendMail(
      getRequiredEnv('MAIL_TO'),
      'Portfolio Settings Login Code',
      `
        <div style="font-family: ui-sans-serif, system-ui;">
          <h2>Login code</h2>
          <p>Your code is:</p>
          <div style="font-size: 28px; font-weight: 700; letter-spacing: 6px;">${code}</div>
          <p>This code expires in 10 minutes.</p>
        </div>
      `
    )

    const response = NextResponse.json({ ok: true })
    response.cookies.set({
      name: getOtpCookieName(),
      value: JSON.stringify(otp),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: getOtpTtlSeconds(),
    })

    return response
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send code'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
