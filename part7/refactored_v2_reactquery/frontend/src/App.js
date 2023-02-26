import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { blogService, userService, setToken } from './services/blogs'
import Login from './components/Login'
import Signup from './components/Signup'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useNot } from './contexts/NotificationContext'
import { useUserVal, useSignIn, useSignOut } from './contexts/UserContext'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [toggle, setToggle] = useState(true)
  const [signup, setSignup] = useState({ name: '', username: '', passowrd: '', confpassword: '' })
  // const [update, setupdate] = useState(null)

  const queryClient = useQueryClient()
  const response = useQuery('blogs', blogService.getAll, { refetchOnWindowFocus: false, retry: 1 })
  const createBlogMutation = useMutation(blogService.createBlog, {
    onSuccess: (createdBlog) => {
      queryClient.invalidateQueries('blogs')
      setNotify(`Blog ${createdBlog.content} is created successfully`, 'success', 5)
    },
    onError: (error) => {
      setNotify(error.response.data.error, 'danger', 5)
    }
  })
  const updateBlogMutation = useMutation(blogService.updateBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
      setNotify('Blog is updated successfully', 'success', 5)
    },
    onError: (error) => {
      setNotify(error.response.data.error, 'danger', 5)
    }
  })
  const deleteBlogMutation = useMutation((BlogId) => {
    blogService.deleteBlog(BlogId)
    const blogs = queryClient.getQueryData('blogs')
    queryClient.setQueryData('blogs', blogs.filter(blog => blog.id !== BlogId))
    setNotify('Blog deleted successfully', 'success', 5)
  })

  const setNotify = useNot()
  const user = useUserVal()
  const signIn = useSignIn()
  const signOut = useSignOut()

  const blogFormRef = useRef()

  useEffect(() => {
    let localstorage = window.localStorage.getItem('blogappuser')
    if (localstorage) {
      signIn(JSON.parse(localstorage))
      setToken(JSON.parse(localstorage).token)
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    if (!(username && password)) {
      setNotify('Please provide username and password', 'danger', 5)
      return
    }
    userService.Login({ username, password })
      .then(response => {
        signIn(response)
        window.localStorage.setItem('blogappuser', JSON.stringify(response))
        setNotify('Logged in successfully', 'success', 5)
        setUsername('')
        setPassword('')
      })
      .catch(() => {
        setNotify('Incorrect username or password', 'danger', 5)
      })
  }

  const handleBlog = (form) => {
    if (!(form.title && form.author && form.url)) {
      setNotify('Please provide title author and url for the blog', 'danger', 5)
      return
    }
    // blogService.createBlog(form)
    //   .then(() => {
    //     setupdate(!update)
    //     setNotify(`Blog '${form.title}' added successfully`, 'success', 5)
    //     blogFormRef.current.toggleVisibility()
    //   })
    //   .catch(() => {
    //     setNotify('Error', 'danger', 5)
    //   })
    createBlogMutation.mutate(form)
  }

  const handleDelete = (id, title) => {
    let confirm = window.confirm(`Are you sure to delete blog '${title}'`)
    if (!confirm) return
    // blogService.deleteBlog(id)
    //   .then(() => {
    //     setBlogs(blogs.filter(blog => blog.id !== id))
    //     setNotify(`Blog '${title}' deleted successfully`, 'success', 5)
    //   })
    //   .catch(() => {
    //     setNotify('Something went wrong', 'danger', 5)
    //   })
    deleteBlogMutation.mutate(id)
  }

  const handleLike = (id, likes) => {
    // blogService.updateBlog(id, { likes })
    //   .then(() => {
    //     setBlogs(blogs.map(blog => {
    //       if (blog.id === id) {
    //         return { ...blog, likes }
    //       } else {
    //         return blog
    //       }
    //     }))
    //     setNotify('you liked it successfully', 'success', 5)
    //   })
    //   .catch(() => {
    //     setNotify('Something went wrong', 'danger', 5)
    //   })
    updateBlogMutation.mutate({ id, likes })
  }

  const handleLogout = () => {
    signOut()
    window.localStorage.removeItem('blogappuser')
    setNotify('Logged out successfully', 'success', 5)
  }

  const handleSignup = (event) => {
    event.preventDefault()
    if (!signup.username) {
      setNotify('Username is missing!', 'danger', 5)
      return
    } else if ((signup.passowrd || signup.confpassword) < 3) {
      setNotify('Password should be atleast 3 characters long', 'danger', 5)
      return
    } else if (!(signup.passowrd === signup.confpassword)) {
      setNotify('Passwords are unmatched', 'danger', 5)
      return
    }
    userService.Signup(signup)
      .then(response => {
        signIn(response)
        window.localStorage.setItem('blogappuser', JSON.stringify(response))
        setNotify('Signed in successfully', 'success', 5)
        setSignup({ name: '', username: '', passowrd: '', confpassword: '' })
      })
      .catch(() => {
        setNotify('The credential you provided is invalid', 'danger', 5)
      })
  }

  const handleUsername = ({ target }) => {
    setUsername(target.value)
  }

  const handlePassword = ({ target }) => {
    setPassword(target.value)
  }

  if (response.isLoading) return <h2>Loading for you</h2>
  if (response.isError) return <h2>Error encountered. Try again later</h2>

  const blogs = response.data

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
      <Notification />
      {user.name ? logoutform : signuploginform}
      {user.name && bloglists}
    </div>
  )
}

export default App