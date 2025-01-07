const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const brandRouter = require('./brandRouter')
const categoryRouter = require('./categoryRouter')
const cartRouter = require('./cartRouter')
const ratingRouter = require('./ratingRouter')

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/brand', brandRouter)
router.use('/product', productRouter)
router.use('/cart', cartRouter)
router.use('/rating', ratingRouter)

module.exports = router