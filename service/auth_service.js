const userRepo = require('../repository/user_repository.js')
const auth = require('./auth.js')

const Router = require('express').Router
const r = Router()

r.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await userRepo.findByUsername(username)
        if (!user || (user.password != password)) {
            return res.status(404).json({"message": "user not found"})
        }

        const token = auth.sign(user)
        return res.json(token)
    } catch (err) {
        console.error(err)
        res.status(403).json({"message": "unauthenticated"})
        return
    }
})

module.exports = r