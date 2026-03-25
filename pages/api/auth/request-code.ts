import type { NextApiRequest, NextApiResponse } from 'next'

import { randomCode6, hashOtp, getOtpCookieName } from '@/lib/auth'
import { serializeCookie } from '@/lib/cookies'
import { sendMail } from '@/lib/mailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const code = randomCode6()
    const otp = {
      hash: hashOtp(code),
      exp: Date.now() + 10 * 60 * 1000, // 10 minutes
    }

    await sendMail(
      process.env.MAIL_TO!,
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

    const cookieValue = JSON.stringify(otp)
    res.setHeader(
      'Set-Cookie',
      serializeCookie(getOtpCookieName(), cookieValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 10 * 60,
      })
    )

    return res.status(200).json({ ok: true })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Failed to send code'
    return res.status(500).json({ error: message })
  }
}

