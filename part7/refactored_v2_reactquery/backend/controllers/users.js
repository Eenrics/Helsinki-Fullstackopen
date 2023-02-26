const userRouter = require('express').Router()
const User = require('../models/users')
require('express-async-errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

userRouter.get('/', async (request, response) => {
    let users = await User.find({}).populate('blogs', {title: 1, likes: 1, author: 1, url: 1})
    response.json(users)
  })

userRouter.post('/', async (request, response) => {
  const { username, name, password} = request.body

  if (!(username && password)) {
    return response.status(400).json(
        { error: 'Please provide username and password'}
        )
  } else if (password.length < 3) {
    return response.status(400).json(
        { error: 'password should be atleast 3 char long'}
        )
  }

  let saltRound = 10

  let passwordHash = await bcrypt.hash(password, saltRound)

  const newUser = {
    username,
    name,
    passwordHash,
    blogs: []
  }

  const user = new User(newUser)

  let savedUser = await user.save()
  
  let userForToken = {
    username: savedUser.username,
    id: savedUser._id.toString()
  }

  let singedToken = jwt.sign(userForToken, process.env.SECRET)

  response.status(201).json(
    {token: singedToken, username: savedUser.username, name: savedUser.name}
  )
})


module.exports = userRouter