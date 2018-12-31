const bodyParser = require('body-parser')
const cors = require('cors')
const i18n = require('i18n')

i18n.configure({
    locales: ['en', 'pt'],
    directory: './locales',
    defaultLocale: 'en'
})

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
    app.use(i18n.init)
}