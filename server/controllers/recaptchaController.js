const axios = require("axios");
const ApiError = require('../error/ApiError')

class RecaptchaController {
    async verify(req, res, next) {
        const { token } = req.body

        if (!token) {
            return next(ApiError.badRequest("recaptcha token missing"));
        }

        try {
            const response = await axios.post(
                `https://www.google.com/recaptcha/api/siteverify`,
                null,
                {
                    params: {
                        secret: "6LeVee0qAAAAAG_pEk7fnBeEbtezVLVg1_TIuzQT",
                        response: token
                    }

                }
            )
            return res.json({ success: true, score: response.data.score, message: "capcha successfully passed" });

        }
        catch (error) {
            return next(ApiError.internal("Internal server error during recaptcha verification"));
        }
    }
}

module.exports = new RecaptchaController();