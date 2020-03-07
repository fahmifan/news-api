const auth = require('./auth.js')

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
        const decoded = auth.verfiy(token)
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
