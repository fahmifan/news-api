const userRepo = require('../repository/user_repository.js')

const Router = require('express').Router
const r = Router()

r.get("/:id", (req, res) => {
    const { id } = req.params
    const user = userRepo.findByID(id)
    if (!user) {
        res.status(404).json({"message": "user not found"})
        return
    }
    res.json(user)
})

r.post("/", async (req, res) => {
    const { user } = req.body
    const newUser = await userRepo.create(user)
    if (!newUser) {
        res.status(400).json({"message": "failed"})
        return
    }

    res.json(newUser)
})

module.exports = r