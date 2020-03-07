var jwt = require('jsonwebtoken');

const secretKey = 'secret'

exports.sign = (user) => {
    if (user.password) {
        delete user.password
    }

    return jwt.sign(user, secretKey);
}

// return decoded token
exports.verfiy = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch(err) {
        console.error(err)
        return false
    }
}

module.exports = exports
