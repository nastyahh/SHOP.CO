const Router = require('express')
const router = new Router()
const ProductController = require('../controllers/productController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole("ADMIN"), ProductController.create)
router.get('/', ProductController.getAll)
router.get('/:id', ProductController.getOne)

module.exports = router