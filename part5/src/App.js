import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { blogService, userService, setToken } from './services/blogs'
import Login from './components/Login'
import Signup from './components/Signup'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [user, setUser] = useState({})
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({ message: '', type: '' })
  const [toggle, setToggle] = useState(true)
  const [signup, setSignup] = useState({ name: '', username: '', passowrd: '', confpassword: '' })
  const [update, setupdate] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    }
    )
  }, [update])

  useEffect(() => {
    let localstorage = window.localStorage.getItem('blogappuser')
    if (localstorage) {
      setUser(JSON.parse(localstorage))
      setToken(JSON.parse(localstorage).token)
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    if (!(username && password)) {
      setNotification({ message: 'Please provide username and password', type: 'danger' })
      setTimeout(() => {
        setNotification({ message: '' })
      }, 5000)
      return
    }
    userService.Login({ username, password })
      .then(response => {
        setUser(response)
        window.localStorage.setItem('blogappuser', JSON.stringify(response))
        setNotification({ message: 'Logged in successfully', type: 'success' })
        setTimeout(() => {
          setNotification({ message: '' })
        }, 5000)
        setUsername('')
        setPassword('')
      })
      .catch(() => {
        setNotification({ message: 'Incorrect username or password', type: 'danger' })
        setTimeout(() => {
          setNotification({ message: '' })
        }, 5000)
      })
  }

  const handleBlog = (form) => {
    if (!(form.title && form.author && form.url)) {
      setNotification({ message: 'Please provide title author and url for the blog', type: 'danger' })
      setTimeout(() => {
        setNotification({ message: '' })
      }, 5000)
      return
    }
    blogService.createBlog(form)
      .then(() => {
        setupdate(!update)
        setNotification({ message: `Blog '${form.title}' added successfully`, type: 'success' })
        setTimeout(() => {
          setNotification({ message: '' })
        }, 5000)
        blogFormRef.current.toggleVisibility()
      })
      .catch(() => {
        setNotification({ message: 'Error', type: 'danger' })
        setTimeout(() => {
          setNotification({ message: '' })
        }, 5000)
      })
  }

  const handleDelete = (id, title) => {
    let confirm = window.confirm(`Are you sure to delete blog '${title}'`)
    if (!confirm) return
    blogService.deleteBlog(id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
        setNotification({ message: `Blog '${title}' deleted successfully`, type: 'success' })
        setTimeout(() => {
          setNotification({ message: '' })
        }, 5000)
      })
      .catch(() => {
        setNotification({ message: 'Something went wrong', type: 'danger' })
        setTimeout(() => {
          setNotification({ message: '' })
        }, 5000)
      })
  }

  const handleLike = (id, likes) => {
    blogService.updateBlog(id, { likes })
      .then(() => {
        setBlogs(blogs.map(blog => {
          if (blog.id === id) {
            return { ...blog, likes }
          } else {
            return blog
          }
        }))
        setNotification({ message: 'you liked it successfully', type: 'success' })
        setTimeout(() => {
          setNotification({ message: '' })
        }, 5000)
      })
      .catch(() => {
        setNotification({ message: 'Something went wrong', type: 'danger' })
        setTimeout(() => {
          setNotification({ message: '' })
        }, 5000)
      })
  }

  const handleLogout = () => {
    setUser({})
    window.localStorage.removeItem('blogappuser')
    setNotification({ message: 'Logged out successfully', type: 'success' })
    setTimeout(() => {
      setNotification({ message: '' })
    }, 5000)
  }

  const handleSignup = (event) => {
    event.preventDefault()
    if (!signup.username) {
      setNotification({ message: 'Username is missing!', type: 'danger' })
      setTimeout(() => {
        setNotification({ message: '' })
      }, 5000)
      return
    } else if ((signup.passowrd || signup.confpassword) < 3) {
      setNotification({ message: 'Password should be atleast 3 characters long', type: 'danger' })
      setTimeout(() => {
        setNotification({ message: '' })
      }, 5000)
      return
    } else if (!(signup.passowrd === signup.confpassword)) {
      setNotification({ message: 'Passwords are unmatched', type: 'danger' })
      setTimeout(() => {
        setNotification({ message: '' })
      }, 5000)
      return
    }
    userService.Signup(signup)
      .then(response => {
        setUser(response)
        window.localStorage.setItem('blogappuser', JSON.stringify(response))
        setNotification({ message: 'Signed in successfully', type: 'success' })
        setTimeout(() => {
          setNotification({ message: '' })
        }, 5000)
        setSignup({ name: '', username: '', passowrd: '', confpassword: '' })
      })
      .catch(() => {
        setNotification({ message: 'The credential you provided is invalid', type: 'danger' })
        setTimeout(() => {
          setNotification({ message: '' })
        }, 5000)
      })
  }

  const handleUsername = ({ target }) => {
    setUsername(target.value)
  }

  const handlePassword = ({ target }) => {
    setPassword(target.value)
  }

  const signuploginform =  <Togglable buttonLabel='signup / login'>
    <>
      <button onClick={() => setToggle(!toggle)}>{toggle ? 'Login' : 'Signup'}</button>
      <br />
      {
        toggle ? <Signup
          handleSignup={handleSignup}
          signup={signup}
          setSignup={setSignup} /> :

          <Login
            handleLogin={handleLogin}
            username={username}
            password={password}
            handleUsername={handleUsername}
            handlePassword={handlePassword} />
      }
    </>
  </Togglable>

  const logoutform = <>
    <span className='userlogo'>{user.name} logged in</span>
    <button className='logout-btn' onClick={handleLogout}>logout</button>
    <hr/>
  </>

  const bloglists = <>
    <h2>blogs</h2>
    <Togglable buttonLabel='write a blog' ref={blogFormRef}>
      <BlogForm
        handleBlog={handleBlog} />
      <br/>
    </Togglable>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} username={user.username} handleDelete={handleDelete} handleLike={handleLike}/>
    )}
  </>

  return (
    <div>
      <Notification notify={notification} />
      {user.name ? logoutform : signuploginform}
      {user.name && bloglists}
    </div>
  )
}

export default App