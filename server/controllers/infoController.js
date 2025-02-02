const { ProductInfo } = require("../models/models");

class InfoController {
    async create(req, res) {
        const { title, description, productId } = req.body;
        const info = await ProductInfo.create({ title, description, productId })

        return res.json(info)
    }

    async getOne(req, res) {
        const { title, productId } = req.params;
        console.log(req)
        const info = await ProductInfo.findOne({ where: productId, title })

        return res.json(info)
    }
}

module.exports = new InfoController()