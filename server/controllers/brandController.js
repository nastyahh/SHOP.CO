const ApiError = require('../error/ApiError');
const { Brand } = require('../models/models')

class BrandController {
    async create(req, res, next) {
        const { name } = req.body;

        const existingBrand = await Brand.findOne({ where: { name } })
        if (existingBrand) return next(ApiError.conflict('Brand already exists'))

        const brand = await Brand.create({ name })
        return res.json({ brand, message: "Brand added" })
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

}

module.exports = new BrandController();