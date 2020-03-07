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

exports.authenticate = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
        // Forbidden
        return res.sendStatus(403);
    }

    const bearer = bearerHeader.split(' ');
    console.log('bearerHeader', bearerHeader)
    if (bearer.length != 2) {
        return res.status(403).json({"message": "invalid token"});
    }

    const bearerToken = bearer[1];
    const token = bearerToken;
    try {
        const decoded = exports.verfiy(token)
        if (!req.context) {
            req.context = {}
        }
    
        req.context.user = decoded  
        next();
    } catch (err) {
        console.error(err)
        return res.sendStatus(403)
    }
}

module.exports = exports
