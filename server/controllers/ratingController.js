const { Rating, Product, User } = require('../models/models')

class RatingController {
    async create(req, res) {
        const { rate, userId, productId, description } = req.body;

        if (!rate || !userId || !productId) {
            return res.status(400).json({ message: 'All fields should be filled' });
        }

        const existingRating = await Rating.findOne({ where: { userId, productId } })
        if (existingRating) {
            return res.status(400).json({ message: 'You have already left a rating for this product' });
        }
        const user = await User.findOne({ where: { id: userId } })
        const rating = await Rating.create({ rate, userId, productId, description })
        const productRatings = await Rating.findAll({ where: { productId } })
        const averageRating = productRatings.reduce((sum, rating) => sum + rating.rate, 0) / productRatings.length;

        await Product.update(
            { rating: averageRating.toFixed(1) },
            { where: { id: productId } }
        )

        return res.json({
            rating,
            username: user.username,
            message: 'Your rating added'
        }
        )
    }

    async getProductRating(req, res) {
        const { userId, productId } = req.query;

        const rating = await Rating.findOne({ where: { userId, productId } })
        if (!rating) return res.json({
            message: "Product has no rating from this user",
            userHasRated: true
        })
        else {
            return res.json({
                rating,
                userHasRated: false
            })
        }
    }
}

module.exports = new RatingController();