const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Cart } = require('../models/models')

const generateJwt = (id, username, email, role) => {
    return jwt.sign({ id, username, email, role }, process.env.SECRET_KEY, { expiresIn: '1m' })
}

class UserController {
    async registration(req, res, next) {
        const { username, email, password, role } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Incorrect email or password'))
        }
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return next(ApiError.badRequest('User with such email already exists'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ username, email, password: hashPassword, role })
        const cart = await Cart.create({ userId: user.id })

        const token = generateJwt(user.id, user.username, user.email, user.role)

        return res.json({
            token, data: {
                message: "You are successfully registered"
            }
        })
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.internal('User with such email not found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Incorrect password'))
        }
        const token = generateJwt(user.id, user.username, user.email, user.role)

        return res.json({
            token, data: {
                message: "You are successfully login"
            }
        })
    }

    async checkAuth(req, res, next) {
        const token = generateJwt(req.user.id, req.user.username, req.user.email, req.user.role)
        return res.json({ token })
    }
}

module.exports = new UserController();