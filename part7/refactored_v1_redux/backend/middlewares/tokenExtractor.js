
const tokenExtractor = (request, response, next) => {
    let methods =  ['PUT', 'POST', 'DELETE']
    let paths = /\/api\/blogs/
    if (paths.test(request.path) && methods.includes(request.method)) {
        let rawToken = request.get('authorization')
        if (rawToken) {
            let tokens = rawToken.split(" ")
            request.token = tokens[0] === "Bearer" ? tokens[1] : false   
        } else {
            return response.status(401).json({error: "invalid or expired token"})
        }
        
    }
    next()
}

module.exports = tokenExtractor