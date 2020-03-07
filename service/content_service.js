const userRepo = require('../repository/user_repository.js')
const contentRepo = require('../repository/content_repository.js')
const auth = require('./auth.js')

const Router = require('express').Router
const r = Router()

r.post("/", auth.authenticate, async (req, res) => {
    try {
        const { content } = req.body
        // TODO: add validation

        // check is user exists ?
        const user = await userRepo.findByID(content.author_id)
        if (!user || !user.id) {
            return res.status(404).json({"message": "author not found"})
        }

        const newContent = await contentRepo.create(content)
        if (!newContent) {
            return res.status(400).json({"message": "failed"})
        }
    
        return res.json(newContent)   
    } catch (err) {
        console.error(err)
        return res.status(500).json({ "message": "something wrong" })
    }
})

r.get("/", async(req, res) => {
    try {
        let { size, page } = req.query

        size = Number.parseInt(size, 10)
        page = Number.parseInt(page, 10)

        const contents = await contentRepo.findAll({ size, page })
        if (!contents) {
            return res.status(404).json({"message": "failed"})
        }
    
        return res.json(contents)   
    } catch (err) {
        console.error(err)
        return res.status(500).json({ "message": "something wrong" })
    }
})

module.exports = r
