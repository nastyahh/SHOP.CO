const Router = require('express')
const router = new Router()
const CartController = require('../controllers/cartController')

router.post('/', CartController.addProduct)
router.get('/:userId', CartController.getAll)

module.exports = router