const Router = require('express')
const router = new Router()
const RatingController = require('../controllers/ratingController')

router.post('/', RatingController.create);
router.get('/get-user-rating', RatingController.getProductRating)

module.exports = router