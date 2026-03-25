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

export async function sendMail(to: string, subject: string, html: string) {
  console.log(html)

  await transporter.sendMail({
    from: 'Portfolio <no-reply@anhkhoa.info>',
    to: to,
    subject: subject,
    html: html,
  })
}
