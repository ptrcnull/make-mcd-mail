const config = require('./config.json')
const nodemailer = require('nodemailer')

module.exports = async () => {
  let transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: config.smtp.username,
      pass: config.smtp.password
    }
  })

  await transporter.verify()

  const sent = await transporter.sendMail({
    from: config.from,
    to: config.to,
    subject: 'mcd_mailer',
    text: 'mail_content_here'
  })
  console.dir(sent)
}
