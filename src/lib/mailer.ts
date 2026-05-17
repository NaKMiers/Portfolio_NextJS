import nodeMailer from 'nodemailer'

import { getRequiredEnv } from '@/lib/required-env'

let cachedTransporter: ReturnType<typeof nodeMailer.createTransport> | null = null

function getTransporter() {
  if (cachedTransporter) {
    return cachedTransporter
  }

  cachedTransporter = nodeMailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: getRequiredEnv('MAIL'),
      pass: getRequiredEnv('MAIL_APP_PASSWORD'),
    },
  })

  return cachedTransporter
}

export async function sendMail(to: string, subject: string, html: string) {
  await getTransporter().sendMail({
    from: 'Portfolio <no-reply@anhkhoa.info>',
    to,
    subject,
    html,
  })
}
