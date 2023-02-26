const mongoose = require('mongoose')
const Blog = require('../models/blogs')
const app = require('../app')
const supertest = require('supertest')
const helper = require('./helper_test')
const api = supertest(app)
const User = require('../models/users')

const globalDatabase = {}

beforeAll(async () => {
  // Create test user
  await User.deleteMany({})
  let pass = await helper.pwdHashed("mathew@hh234")
  let user = helper.initialUsers[0]
  let usersObject = new User({...user, passwordHash: pass})
  let savedUser = await usersObject.save()
  let token = await helper.getValidToken(savedUser)
  globalDatabase.token = token
  globalDatabase.id = savedUser._id.toString()
})

beforeEach(async () => {
  // Clean up blogs db
  await Blog.deleteMany({})
  let blogsObject = helper.initialBlogs
        .map(blog => new Blog(blog))
  let promiseArray = blogsObject.map(blog => blog.save())
  await Promise.all(promiseArray)
}, 100000)

describe("when there is initially some blogs saved", () => {
    test("blogs are returned as json", async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test("all blogs are returned", async () => {
        const response = await api
        .get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('the blog can be found in the response', async () => {
        const response = await api.get('/api/blogs')
        let blogs = response.body.map(res => res.title)
      
        expect(blogs).toContain("Super power using supertest")
      })

    test('the blog id can be found in the response', async () => {
        const response = await api.get('/api/blogs')
        let blog = response.body[0]
      
        expect(blog.id).toBeDefined()
      })
})

describe('addition of a new blog', () => {
  test('addition of blog succeeds with valid data and authorization', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      title: "async is fun",
      author: "async await",
      url: "https://thisisfakeurl",
      likes: 5
    }
    
    let response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set({Authorization: `Bearer ${globalDatabase.token}`})
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain('async is fun')   
  })

  test('addition of blog fails with valid data but missing authorization', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      title: "async is fun",
      author: "async await",
      url: "https://thisisfakeurl",
      likes: 5
    }
    
    let response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).not.toContain('async is fun')   
  })

    test('like will have the default 0 if missing', async () => {
      const newBlog = {
        title: "blog with out like",
        author: "fake author",
        url: "https://this.isfake.url"
      }
  
      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .set({Authorization: `Bearer ${globalDatabase.token}`})
  
      expect(response.body.likes).toBe(0)
    })
  
    test('blog without title or url will not be created', async () => {
      const newBlog1 = {
        author: "don't have title",
        url: "https://this.isfake.url",
        likes: 9
      }

      const newBlog2 = {
        title: "blog without url",
        author: "fake author",
        likes: 9
      }
  
      await api
        .post('/api/blogs')
        .send(newBlog1)
        .set({Authorization: `Bearer ${globalDatabase.token}`})
        .expect(400)
  
      await api
        .post('/api/blogs')
        .send(newBlog2)
        .set({Authorization: `Bearer ${globalDatabase.token}`})
        .expect(400)
  
    }, 100000)
  })
  
  describe("blog can be deleted", () => {
    test('blog with valid id can be deleted', async () => {
      const newBlog = {
        title: "async is fun",
        author: "async await",
        url: "https://thisisfakeurl",
        likes: 5
      }
      
      let response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set({Authorization: `Bearer ${globalDatabase.token}`})
      .expect(201)
      .expect('Content-Type', /application\/json/)
      
      const blogsAtStart = await helper.blogsInDb()

      await api
      .delete(`/api/blogs/${response.body.id}`)
      .set({Authorization: `Bearer ${globalDatabase.token}`})
      .expect(204)
  
      const blogsAtEnd = await helper.blogsInDb()
      const idsAtEnd = blogsAtEnd.map(blog => blog.id)
  
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
      expect(idsAtEnd).not.toContain(response.body.id)
  
    }, 100000)

    test('delete request without authorization will be successful', async () => {
      const newBlog = {
        title: "async is fun",
        author: "async await",
        url: "https://thisisfakeurl",
        likes: 5
      }
      
      let response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set({Authorization: `Bearer ${globalDatabase.token}`})
      .expect(201)
      .expect('Content-Type', /application\/json/)
      
      const blogsAtStart = await helper.blogsInDb()

      await api
      .delete(`/api/blogs/${response.body.id}`)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd = await helper.blogsInDb()
      const idsAtEnd = blogsAtEnd.map(blog => blog.id)
  
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
      expect(idsAtEnd).toContain(response.body.id)
  
    }, 100000)
  })

describe("blog can be updated", () => {
   test('blog with valid id can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      likes: 243
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .set({Authorization: `Bearer ${globalDatabase.token}`})
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const returnedBlog = blogsAtEnd.filter(blog => blog.id === blogToUpdate.id)[0]

    expect(returnedBlog.likes).toBe(243)
    expect(returnedBlog.likes).not.toBe(blogToUpdate.likes)
  }, 100000)
})

afterAll(async () => {
    mongoose.connection.close()
})