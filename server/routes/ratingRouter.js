const Router = require('express')
const router = new Router()
const RatingController = require('../controllers/ratingController')

router.post('/', RatingController.create)

module.exports = router