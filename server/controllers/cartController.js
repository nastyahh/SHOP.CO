const { Cart, CartProduct, Product } = require('../models/models')

class CartController {
    async addProduct(req, res) {
        const { userId, productId, quantity } = req.body

        try {
            let cart = await Cart.findOne({ where: { userId } })

            if (!cart) {
                cart.userId = userId;
                await cart.save()
            }

            const existingProduct = await CartProduct.findOne({ where: { cartId: cart.id, productId } })
            if (existingProduct) {
                existingProduct.quantity += quantity
                await existingProduct.save();
            }
            await CartProduct.create({ cartId: cart.id, productId, quantity })
            return res.json({ message: 'Продукт добавлен в корзину' });
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({ message: 'Ошибка при добавлении товара в коризну' });
        }
    }

    async getAll(req, res) {
        const { userId } = req.params;

        try {
            const cart = await Cart.findOne({
                where: { userId }, include: [{
                    model: CartProduct,
                    include: [{ model: Product }]
                }],
            })
            if (!cart) {
                return res.json({ products: [] })
            }

            return res.json(cart)
        }
        catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при получении корзины', e });
        }

    }

}

module.exports = new CartController();