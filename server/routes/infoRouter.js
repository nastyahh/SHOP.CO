const Router = require('express')
const router = new Router()
const infoController = require("../controllers/infoController");

router.get('/:productId', infoController.getOne)
router.post('/', infoController.create)

module.exports = router