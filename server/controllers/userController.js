const ApiError = require('../error/ApiError')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User, Cart } = require('../models/models')
const uuid = require('uuid')
const path = require('path')

const generateJwt = (id, username, email, role) => {
    return jwt.sign({ id, username, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' })
}


class UserController {
    async registration(req, res, next) {
        const { username, email, password, role } = req.body
        console.log(req.files)

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

    async changePassword(req, res, next) {
        const { userId, current_password, new_password } = req.body;

        const user = await User.findOne({ where: { id: userId } })
        console.log("currenr", current_password)
        console.log("user", user.password)
        const isMatch = await bcrypt.compare(current_password, user.password);


        if (!isMatch) {
            return next(ApiError.badRequest("Current password doesn`t match"))
        }

        const hashedPassword = await bcrypt.hash(new_password, 5)

        await User.update({ password: hashedPassword }, { where: { id: userId } })

        return res.json({ message: "Password successfully changed" })

    }
}

module.exports = new UserController();