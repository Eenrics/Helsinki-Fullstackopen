const blogRouter = require('express').Router()
const Blog = require('../models/blogs')
require('express-async-errors')
const jwt = require('jsonwebtoken')
const User = require('../models/users')


blogRouter.get('/', async (request, response) => {
    let blogs = await Blog.find({}).populate('user', {name: 1, username: 1})
    response.json(blogs)
  })

blogRouter.get('/:id', async (request, response) => {
    let blogs = await Blog.findById(request.params.id).populate('authors', {name: 1, username: 1})
    response.json(blogs)
  })

blogRouter.post('/', async (request, response) => {
  const body = request.body
  
  let user = await User.findById(request.user.id)

  if (!user) return response.status(401).json({error: "user not found"})

  if (!body.title || !body.url) {
    return response.status(400).json({error: "title or url is required"})
  }

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  }

  const blog = new Blog(newBlog)

  let savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => { 

  let user = await User.findById(request.user.id)
  if (!user) return response.status(401).json({error: "user not found"})
  
  let blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({error: "blog not found"})
  } else if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({error: "blog was not created by you. You can not delete the blogs"})
  }

  user.blogs = user.blogs.filter(blog => blog._id.toString() !== blog._id.toString())
  await user.save()
  await blog.delete()

  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => { 
  await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.status(204).end()
})

module.exports = blogRouter