const { Feedback } = require("../models/models");

class FeedbackController {
    async addFeedback(req, res) {
        const { userId, email, message } = req.body;
        const feedback = await Feedback.create({ userId, email, message })

        return res.json({ message: "your data was successfully sent" })


    }
}

module.exports = new FeedbackController()