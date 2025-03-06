const uuid = require('uuid')
const path = require('path')
const { Op } = require('sequelize')
const { Product, ProductInfo, Rating, Brand, User, Category } = require('../models/models')
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
                const parsedInfo = JSON.parse(info);
                parsedInfo.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                );
            }

            return res.json({ product, message: "Product successfully created" })
        }
        catch (e) {
            console.log(e)
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let { brandId, categoryId, minPrice, maxPrice, gender, limit, page } = req.query

        page = Number(page) || 1;
        limit = limit || 9;
        let offset = page * limit - limit;

        let where = {}

        if (brandId) {
            where.brandId = { [Op.in]: brandId.split(',') }
        }
        if (categoryId) {
            where.categoryId = { [Op.in]: categoryId.split(',') }
        }
        if (minPrice) where.price = { ...where.price, [Op.gte]: minPrice }
        if (minPrice) where.price = { ...where.price, [Op.lte]: maxPrice }
        if (gender) {
            console.log('gender', gender)
            where.gender = gender
        };

        const products = await Product.findAndCountAll({
            where,
            limit,
            offset,
        })
        const totalPages = Math.ceil(products.count / limit)

        return res.json({ products: products, totalCountPages: totalPages });
    }

    async getOne(req, res) {
        const { id } = req.params;
        const product = await Product.findOne({
            where: { id },
            include: [{ model: ProductInfo, as: 'info' },
            { model: Brand, as: 'brand', attributes: ['name'] }
            ]
        })


        const ratings = await Rating.findAll({
            where: { productId: id },
            include: {
                model: User,
                attributes: ['username']
            }
        })

        return res.json({ product, ratings })
    }
}

module.exports = new ProductController();