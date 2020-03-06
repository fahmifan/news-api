const express = require('express')
const bodyParser = require('body-parser')
const userService = require('./user_service')
const authService = require('./auth_service')

const app = express()

// create application/json parser
app.use(bodyParser.json({ type: 'application/json' }))
app.get("/ping", (req, res) => res.json({"ping": "pong"}))
app.use("/users", userService)
app.use("/auth", authService)

exports.start = () => {
    app.listen(3000, () => {
        console.log("server start @ :3000")
    })
}

module.exports = exports
