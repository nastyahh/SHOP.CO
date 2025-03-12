const Router = require('express')
const router = new Router()
const RecaptchaController = require('../controllers/recaptchaController')

router.post('/verify', RecaptchaController.verify)

module.exports = router