
const jwt = require('jsonwebtoken')

const userExtractor = (request, response, next) => {

    if (request.token) {
        let user = jwt.verify(request.token, process.env.SECRET) 
        if (user) {
            request.user = user
        } else {
            return response.status(401).json({error: "invalid or expired token"})
        }
        
    }
    next()
}

module.exports = userExtractor