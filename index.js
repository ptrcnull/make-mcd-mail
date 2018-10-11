const fs = require('fs')
const config = require('./config.json')

const randomstring =
  '06y7' +
  '3' + Math.random().toString(36).substr(2, 3) +
  Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4)

const path = config.maildir + '/cur/' + process.argv[2]

let mail = fs.readFileSync(path, 'utf-8')
  .replace('From: ' + config.from, 'From: "Badanie.Satysfakcji@ankieta.mcdonalds.pl" <Badanie.Satysfakcji@ankieta.mcdonalds.pl>')
  .replace(config.body, `<html><table style="width:580px;"><tbody><tr><td colspan="2">Dziękujemy za
udział w badaniu. Przesyłamy wybrany przez Pana/ią
kupon.</td></tr><tr></tr><tr><td>DATA WYDANIA: ${new Date().toJSON().split('T')[0].split('-').reverse().join('-')}</td><td>UNIKALNY
KOD: ${randomstring}</td></tr><tr><td colspan="2"><img
src="https://echo.gfk.com/static/shared/gsc/echo/McDonalds/Poland/coupons/21_08_17_big_ice_cream.png"></td></tr></tbody></table></html>`)
  .replace(`Content-Type: text/plain; charset=US-ASCII;
 format=flowed`, 'Content-Type: text/html; charset=utf-8')
  .replace('Content-Transfer-Encoding: 7bit', 'Content-Transfer-Encoding: 8bit')
  .replace('Subject: ' + config.subject, 'Subject: =?utf-8?Q?McDonald=E2=80=99s?=')

fs.writeFileSync(path, mail, 'utf-8')
