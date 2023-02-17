const Blog = require('../models/blogs')
const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Blog helper setup

let initialBlogs = [
    {
        title: "Super power using supertest",
        author: "Migo Lavarta",
        url: "https://test.com/test3",
        likes: 3
    },
    {
        title: "Jest is fun",
        author: "Lebron Smith",
        url: "https://test.com/test2",
        likes: 1
    }
]

let blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

let nonExsId = async () => {
    const blog = new Blog({
        title: "Jest is fun",
        author: "Lebron Smith",
        url: "https://test.com/test2",
        likes: 1
    })

    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

// User Helper setup

const saltRound = 10

let pwdHashed = async (pwd) => await bcrypt.hash(pwd, saltRound)

let initialUsers = [
    {
        user: "Emanuel Math",
        username: "emanmath",
    },
    {
        user: "Luke James",
        username: "like123",
    }
]

let usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const getValidToken = async (user) => {
    return jwt.sign({username: user.username, id: user._id.toString()}, process.env.SECRET)
}


module.exports = { 
    initialBlogs, 
    blogsInDb, 
    nonExsId,
    initialUsers,
    usersInDb,
    pwdHashed,
    getValidToken
}