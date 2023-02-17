require('dotenv').config()

const url = process.env.NODE_ENV === 'production' ?
                 process.env.MONGODB_URI : process.env.TEST_MONGODB_URI
const PORT = process.env.PORT

module.exports = {url, PORT}