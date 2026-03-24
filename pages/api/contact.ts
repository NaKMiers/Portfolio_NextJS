import { sendMail } from '@/lib/mailer'

export default async function handler(req: any, res: any) {
  try {
    if (req.method === 'POST') {
      const { email, firstname, lastname, subject, message } = req.body
      console.log(req.body)

      await sendMail(
        process.env.MAIL_TO!,
        subject || 'Portfolio',
        `
          <div>
            <h1>Portfolio: anhkhoa.site</h1>
            <p>From: ${email}</p>
            <p>Name: ${firstname} ${lastname}</p>
            <p>Message: ${message}</p>
          </div>
        `
      )
      return res.json(req.body)
    }

    return res.status(405).json({ error: 'Method Not Allowed' })
  } catch (err: any) {
    return res.json({ error: err.message }, { status: 500 })
  }
}
