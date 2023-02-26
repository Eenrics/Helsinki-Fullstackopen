const loginRouter = require('express').Router()
const User = require('../models/users')
require('express-async-errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


loginRouter.post('/', async (request, response) => {
  const { username, password} = request.body

  if (!(username && password)) {
    return response.status(400).json(
        { error: 'Please provide username and password'}
        )
  }
  
  const userInfo = await User.findOne({username})

  if (!userInfo) return response.status(401).json({error: "user not found"})

  let validPassword = await bcrypt.compare(password, userInfo.passwordHash)
  if (!validPassword) return response.status(401).json({error: "incorrect user or password"})
  
  let userForToken = {
    username: userInfo.username,
    id: userInfo._id.toString()
  }

  let singedToken = jwt.sign(userForToken, process.env.SECRET)

  response.status(200).json(
    {token: singedToken, username: userInfo.username, name: userInfo.name}
    )
})


module.exports = loginRouter