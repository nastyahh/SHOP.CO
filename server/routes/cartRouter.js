const Router = require('express')
const router = new Router()
const CartController = require('../controllers/cartController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, CartController.addProduct)
router.delete('/delete', authMiddleware, CartController.deleteProduct)
router.get('/:userId', authMiddleware, CartController.getAll)

module.exports = router