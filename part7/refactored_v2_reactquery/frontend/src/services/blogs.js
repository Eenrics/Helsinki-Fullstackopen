import axios from 'axios'
const baseUrl = '/api/blogs'
const loginUrl = '/api/login'
const signupUrl = '/api/users'

let token = null

const setToken = (rawToken) => {
  token = `Bearer ${rawToken}`
}

const Login = async (userObject) => {
  const response = await axios.post(loginUrl, userObject)
  setToken(response.data.token)
  return response.data
}

const Signup = async (rawUserObject) => {
  let userObject = {
    username: rawUserObject.username,
    name: rawUserObject.name,
    password: rawUserObject.passowrd
  }
  console.log(userObject)
  const response = await axios.post(signupUrl, userObject)
  setToken(response.data.token)
  return response.data
}

// eslint-disable-next-line
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// const updateBlog = async (blogId, blogObject) => {
//   const config = {
//     headers: { Authorization: token },
//   }
//   const response = await axios.put(`${baseUrl}/${blogId}`, blogObject, config)
//   return response.data
// }

const updateBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject, config)
  return response.data
}

const createBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

let blogService = { getAll, updateBlog, deleteBlog, createBlog }
let userService = { Login, Signup, }

// eslint-disable-next-line
export { blogService, userService, setToken}