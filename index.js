const fs = require('fs')
const config = require('./config.json')
const sendMail = require('./sendMail')
const getMailContent = require('./getMailContent')
const getFiles = path => fs.readdirSync(path).slice(-10).filter(file => fs.readFileSync(path + file, 'utf8').includes('Subject: mcd_mailer'))

sendMail().then(async () => {
  const randomstring =
    '06y7' +
    '3' + Math.random().toString(36).substr(2, 3) +
    Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4)

  const path = config.maildir + '/cur/'
  let files = getFiles(path)

  while (files.length === 0) {
    await new Promise((resolve, reject) => setTimeout(resolve, 100))
    files = getFiles(path)
  }

  const file = path + files[0]

  let mail = fs.readFileSync(file, 'utf8')
    .replace('From: ' + config.from, 'From: "Badanie.Satysfakcji@ankieta.mcdonalds.pl" <Badanie.Satysfakcji@ankieta.mcdonalds.pl>')
    .replace('mail_content_here', getMailContent(randomstring, config.type))
    .replace(`Content-Type: text/plain`, 'Content-Type: text/html; charset=utf-8')
    .replace('Content-Transfer-Encoding: 7bit', 'Content-Transfer-Encoding: 8bit')
    .replace('Subject: mcd_mailer', 'Subject: =?utf-8?Q?McDonald=E2=80=99s?=')

  fs.writeFileSync(file, mail, 'utf8')
})
