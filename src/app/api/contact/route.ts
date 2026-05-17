import { NextResponse } from 'next/server'

import { sendMail } from '@/lib/mailer'
import { getRequiredEnv } from '@/lib/required-env'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

export async function POST(request: Request) {
  const { email, firstname, lastname, subject, message } = (await request.json()) ?? {}

  if (
    !isNonEmptyString(email) ||
    !isNonEmptyString(firstname) ||
    !isNonEmptyString(lastname) ||
    !isNonEmptyString(subject) ||
    !isNonEmptyString(message)
  ) {
    return NextResponse.json({ error: 'Please complete all contact form fields.' }, { status: 400 })
  }

  try {
    await sendMail(
      getRequiredEnv('MAIL_TO'),
      subject.trim(),
      `
        <div>
          <h1>Portfolio: anhkhoa.site</h1>
          <p>From: ${email.trim()}</p>
          <p>Name: ${firstname.trim()} ${lastname.trim()}</p>
          <p>Message: ${message.trim()}</p>
        </div>
      `
    )

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact form submission failed', error)
    return NextResponse.json(
      {
        error: 'Unable to send your message right now. Please try again later or email me directly.',
      },
      { status: 500 }
    )
  }
}

export function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
}
