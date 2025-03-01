const { Category } = require('../models/models')
const ApiError = require('../error/ApiError')

class CategoryController {
    async create(req, res, next) {
        try {
            const { name } = req.body;

            const existingCategory = await Category.findOne({ where: { name } });
            if (existingCategory) return next(ApiError.conflict('Category already exists'))

            await Category.create({ name });
            return res.json({
                message: "Category created"
            });
        } catch (error) {
            next(ApiError.internal("Error creating category"));
        }
    }

    async getAll(req, res) {
        const categories = await Category.findAll()
        return res.json(categories)
    }

}

module.exports = new CategoryController();