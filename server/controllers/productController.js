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
            console.log("Content-Type:", req.headers['content-type']);
            console.log("BODY:", req.body);
            console.log("FILES:", req.files);
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
        if (maxPrice) where.price = { ...where.price, [Op.lte]: maxPrice }
        if (gender) {
            where.gender = gender
        };

        const products = await Product.findAndCountAll({
            where,
            limit,
            offset,
        })
        const totalPages = Math.ceil(products.count / limit)

        const productsWithDiscount = products.rows.map((p) => {
            const currentDate = new Date()
            let priceWithDiscount = p.price;

            if (p.discount > 0 && p.discountStartDate && p.discountEndDate) {
                console.log("p.discountStartDate", p.discountStartDate)
                if (
                    (p.discountStartDate && currentDate >= new Date(p.discountStartDate)) &&
                    (p.discountEndDate && currentDate <= new Date(p.discountEndDate))
                ) {
                    priceWithDiscount = p.price * (1 - p.discount / 100)
                }
            }
            return {
                ...p.dataValues,
                priceWithDiscount,
            };
        })

        return res.json({ products: productsWithDiscount, totalCountPages: totalPages });
    }

    async getOne(req, res) {
        const { id } = req.params;
        const product = await Product.findOne({
            where: { id },
            include: [{ model: ProductInfo, as: 'info' },
            { model: Brand, as: 'brand', attributes: ['name'] }
            ]
        })

        if (!product) {
            return res.json({ message: "Product not found" })
        }

        const ratings = await Rating.findAll({
            where: { productId: id },
            include: {
                model: User,
                attributes: ['username']
            }
        })

        return res.json({ product, ratings })
    }

    async update(req, res) {
        console.log("req.body", req.body)
        const { id, name, price, brandId, categoryId, info, gender, discount, discountStartDate, discountEndDate } = req.body;

        const product = await Product.findOne({ where: { id } })
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (req.files?.img) {
            const fileName = uuid.v4() + ".jpg";
            req.files.img.mv(path.resolve(__dirname, '..', 'static', fileName));
            product.img = fileName;
        }

        const updatedFields = Object.fromEntries(Object.entries({ name, price, brandId, categoryId, gender, discount, discountStartDate, discountEndDate }).filter((_, value) => value != undefined))

        await product.update(updatedFields);

        if (info) {
            await ProductInfo.destroy({ where: { productId: id } });
            const parsedInfo = JSON.parse(info);
            await ProductInfo.bulkCreate(parsedInfo.map(i => ({
                title: i.title,
                description: i.description,
                productId: id
            })));
        }

        return res.json({ message: "Product successfully updated", product });
    }
}

module.exports = new ProductController();