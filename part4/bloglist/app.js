const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blogs')
const { info, error } = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const config = require('./utils/config')

mongoose.set('strictQuery', false)
mongoose.connect(config.url)
    .then(res => info('connected to db'))


app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app