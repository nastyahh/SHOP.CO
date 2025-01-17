const uuid = require('uuid')
const path = require('path')
const { Product, ProductInfo, Rating } = require('../models/models')
const ApiError = require('../error/ApiError');
const { DESCRIBE } = require('sequelize/lib/query-types');

class ProductController {
    async create(req, res, next) {
        try {
            const { name, price, brandId, categoryId, info, gender } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + ".jpg"; //генерируем айди для картинки
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const product = await Product.create({ name, price, brandId, categoryId, img: fileName, gender })

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                )
            }

            return res.json(product)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let { brandId, categoryId, limit, page } = req.query
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let products;
        if (!brandId && !categoryId) {
            products = await Product.findAndCountAll({ limit, offset })
        }
        if (brandId && !categoryId) {
            products = await Product.findAndCountAll({ where: { brandId }, limit, offset })
        }
        if (!brandId && categoryId) {
            products = await Product.findAndCountAll({ where: { categoryId }, limit, offset })
        }
        if (brandId && categoryId) {
            products = await Product.findAndCountAll({ where: { categoryId, brandId }, limit, offset })
        }

        return res.json(products);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const product = await Product.findOne({
            where: { id },
            include: [{ model: ProductInfo, as: 'info' }]
        })

        const ratings = await Rating.findAll({ where: { productId: id } })

        return res.json({ product, ratings })
    }
}

module.exports = new ProductController();