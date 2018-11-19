module.exports = (random, type) => `<html><table style="width:580px;"><tbody><tr><td colspan="2">Dziękujemy za
udział w badaniu. Przesyłamy wybrany przez Pana/ią
kupon.</td></tr><tr></tr><tr><td>DATA WYDANIA: ${new Date().toJSON().split('T')[0].split('-').reverse().join('-')}</td><td>UNIKALNY
KOD: ${random}</td></tr><tr><td colspan="2"><img
src="https://echo.gfk.com/static/shared/gsc/echo/McDonalds/Poland/coupons/21_08_17_${type}.png"></td></tr></tbody></table></html>`
