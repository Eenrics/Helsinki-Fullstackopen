const mongoose = require('mongoose')
const User = require('../models/users')
const app = require('../app')
const supertest = require('supertest')
const helper = require('./helper_test')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  let pass1 = await helper.pwdHashed("mathew@hh234")
  let pass2 = await helper.pwdHashed("Lukejame@#dld")

  let pass = [pass1, pass2]

  let usersObject = helper.initialUsers
        .map((user, ind) => new User({...user, passwordHash: pass[ind]}))
  let promiseArray = usersObject.map(user => user.save())

  await Promise.all(promiseArray)
}, 100000)

describe("get user", () => {
    test("all users returned as json", async () => {
        await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    }, 100000)

    test("all users are returned", async () => {
        const response = await api
        .get('/api/users')

        expect(response.body).toHaveLength(helper.initialUsers.length)
    })

    test('the users can be found in the response', async () => {
        const response = await api.get('/api/users')
        let users = response.body.map(res => res.username)
      
        expect(users).toContain(helper.initialUsers[0].username)
        expect(users).toContain(helper.initialUsers[1].username)
      })

    test('the user password can not be found in the response', async () => {
        const response = await api.get('/api/users')
        let user = response.body[0]
      
        expect(user.password).not.toBeDefined()
        expect(user.passwordHash).not.toBeDefined()
      })
})

describe('addition of a new user', () => {
    test('user creation succeeds with valid data', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        name: "Bob Slyvian",
        username: "bobyman@slv",
        password: "bobylovescats1234",
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain('bobyman@slv')
    })
  
    test('users password is stored hashed', async () => {
      const newUser = {
        name: "Bob Slyvian",
        username: "bobyman@slv",
        password: "bobylovescats1234",
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
        const userInDb = await User.find({username: 'bobyman@slv'})
    
        expect(userInDb.password).not.toBeDefined()
        expect(userInDb.passwordHash).not.toBe(newUser.password)
    })
  
    test('user without username or password is not created', async () => {

      const usersAtStart = await helper.usersInDb()

      // With no username
      const newUser1 = {
        name: "Boby Slyvian",
        password: "bobyforgotshisusername",
      }

      // With no password
      const newUser2 = {
        name: "Boby Slyvian",
        username: "bobyforgotshispassword",
      }
  
      let response1 = await api
        .post('/api/users')
        .send(newUser1)
        .expect(400)
  
      let response2 = await api
        .post('/api/users')
        .send(newUser2)
        .expect(400)

      const errorMessage = 'Please provide username and password'
      const usersAtEnd = await helper.usersInDb()

      expect(usersAtEnd).toHaveLength(usersAtStart.length)
      expect(response1.body.error).toContain(errorMessage)
      expect(response2.body.error).toContain(errorMessage)

    }, 100000)
  
    test('user with invalid username or password is not created', async () => {

      const usersAtStart = await helper.usersInDb()

      // With invalid username
      const newUser3 = {
        name: "Boby Slyvian",
        password: "bobyusersinvalidusername",
        username: helper.initialUsers[0].username
      }

      const newUser4 = {
        name: "Boby Slyvian",
        password: "bobyusersshortusername",
        username: "fe"
      }

      // With invalid password
      const newUser5 = {
        name: "Boby Slyvian",
        username: "bobyusersshortpassword",
        password: "bo"
      }
  
  
      let response3 = await api
        .post('/api/users')
        .send(newUser3)
        .expect(400)
  
        let response4 = await api
        .post('/api/users')
        .send(newUser4)
        .expect(400)
        
  
        let response5 = await api
        .post('/api/users')
        .send(newUser5)
        .expect(400)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
      expect(response3.body.error).toBe("User validation failed: username: Error, expected `username` to be unique. Value: `emanmath`")
      expect(response4.body.error).toBe("User validation failed: username: Path `username` (`fe`) is shorter than the minimum allowed length (3).")
      expect(response5.body.error).toBe("password should be atleast 3 char long")

    }, 100000)
  })

// describe("blog can be deleted", () => {
//   test('blog with valid id can be deleted', async () => {
//     const blogsAtStart = await helper.blogsInDb()
//     const blogToDelete = blogsAtStart[0]

//     await api
//       .delete(`/api/blogs/${blogToDelete.id}`)
//       .expect(204)

//     const blogsAtEnd = await helper.blogsInDb()
//     const idsAtEnd = blogsAtEnd.map(blog => blog.id)

//     expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
//     expect(idsAtEnd).not.toContain(blogToDelete.id)

//   }, 100000)
// })

// describe("blog can be updated", () => {
//   test('blog with valid id can be updated', async () => {
//     const blogsAtStart = await helper.blogsInDb()
//     const blogToUpdate = blogsAtStart[0]

//     const updatedBlog = {
//       likes: 243
//     }

//     await api
//       .put(`/api/blogs/${blogToUpdate.id}`)
//       .send(updatedBlog)
//       .expect(204)

//     const blogsAtEnd = await helper.blogsInDb()
//     const returnedBlog = blogsAtEnd.filter(blog => blog.id === blogToUpdate.id)[0]

//     expect(returnedBlog.likes).toBe(243)
//     expect(returnedBlog.likes).not.toBe(blogToUpdate.likes)
//   }, 100000)
// })

afterAll(async () => {
    mongoose.connection.close()
})