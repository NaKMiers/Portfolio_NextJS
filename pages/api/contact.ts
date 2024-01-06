import nodeMailer from 'nodemailer'

// SENDMAIL CORE
const transporter = nodeMailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_APP_PASSWORD,
  },
})

function sendMail(to: string, subject: string, html: string) {
  transporter.sendMail({
    from: 'Portfolio',
    to: to,
    subject: subject,
    html: html,
  })
}

export default async function handler(req: any, res: any) {
  console.log(2131232)
  try {
    if (req.method === 'POST') {
      const { email, firstname, lastname, subject, message } = req.body

      sendMail(
        process.env.MAIL_TO!,
        subject || 'Portfolio',
        `
          <div>
            <p>From: ${email}</p>
            <p>Name: ${firstname} ${lastname}</p>
            <p>Content: ${message}</p>
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
