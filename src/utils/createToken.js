const jwt = require('jsonwebtoken'); //Libreria para los webtokens

const createToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        name: user.name
    }
    
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '2h'})
}

module.exports = createToken;