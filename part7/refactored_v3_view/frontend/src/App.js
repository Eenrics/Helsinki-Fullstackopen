import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { blogService, userService, setToken } from './services/blogs'
import Login from './components/Login'
import Signup from './components/Signup'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNot } from './reducers/notificationReducer'
import { updateBlog, setBlog, deleteBlog, commentBlog } from './reducers/blogReducer'
import { signIn, signOut } from './reducers/userReducer'
import UserList from './components/UserList'
import {
  Routes, Route, useMatch, Link
} from 'react-router-dom'
import UserDetail from './components/UserDetail'
import BlogDetail from './components/BlogDetail'
import styled from 'styled-components'


const Nav = styled.nav`
  background-color: antiquewhite;
  padding: 0.5rem;
  width: 50%;
`

export const Notify = styled.div`
font-size: 1.2rem;
border-radius: 20px;
animation: not 5.1s;
transition: 1s;
overflow: hidden;
position: fixed;
box-shadow: 0 0 5px 1px darkgray;
left: 10%;
`

export const Button = styled.button`
border-radius: 10px;
padding: 5px;
outline: none;
border: 0;
border: solid 1px transparent;
`


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [toggle, setToggle] = useState(true)
  const [signup, setSignup] = useState({ name: '', username: '', passowrd: '', confpassword: '' })
  const [update, setupdate] = useState(null)
  const [users, setUsers] = useState(null)

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(setBlog( blogs.sort((a, b) => b.likes - a.likes) ))
    }
    )
    userService.getAllUsers().then(users => {
      setUsers(users)
    }
    )
  }, [update])

  useEffect(() => {
    let localstorage = window.localStorage.getItem('blogappuser')
    if (localstorage) {
      dispatch(signIn(JSON.parse(localstorage)))
      setToken(JSON.parse(localstorage).token)
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    if (!(username && password)) {
      dispatch(setNot('Please provide username and password', 'danger', 5))
      return
    }
    userService.Login({ username, password })
      .then(response => {
        dispatch(signIn(response))
        window.localStorage.setItem('blogappuser', JSON.stringify(response))
        dispatch(setNot('Logged in successfully', 'success', 5))
        setUsername('')
        setPassword('')
      })
      .catch(() => {
        dispatch(setNot('Incorrect username or password', 'danger', 5))
      })
  }

  const handleBlog = (form) => {
    if (!(form.title && form.author && form.url)) {
      dispatch(setNot('Please provide title author and url for the blog', 'danger', 5))
      return
    }
    blogService.createBlog(form)
      .then(() => {
        setupdate(!update)
        dispatch(setNot(`Blog '${form.title}' added successfully`, 'success', 5))
        blogFormRef.current.toggleVisibility()
      })
      .catch(() => {
        dispatch(setNot('Error', 'danger', 5))
      })
  }

  const handleDelete = (id, title) => {
    let confirm = window.confirm(`Are you sure to delete blog '${title}'`)
    if (!confirm) return
    blogService.deleteBlog(id)
      .then(() => {
        dispatch(deleteBlog(id))
        dispatch(setNot(`Blog '${title}' deleted successfully`, 'success', 5))
      })
      .catch(() => {
        dispatch(setNot('Something went wrong', 'danger', 5))
      })
  }

  const handleLike = (id, likes) => {
    blogService.updateBlog(id, { likes })
      .then(() => {
        dispatch(updateBlog({ id, likes }))
        dispatch(setNot('you liked it successfully', 'success', 5))
      })
      .catch(() => {
        dispatch(setNot('Something went wrong', 'danger', 5))
      })
  }

  const handleComment = (id, comment) => {
    if (!comment) return
    const blog = blogs.find(blog =>  blog.id === id)
    blogService.addComment({ ...blog,  comments: comment })
      .then(() => {
        dispatch(commentBlog({ id, comment }))
        dispatch(setNot('you commented successfully', 'success', 5))
      })
      .catch(() => {
        dispatch(setNot('Something went wrong', 'danger', 5))
      })
  }

  const handleLogout = () => {
    dispatch(signOut())
    window.localStorage.removeItem('blogappuser')
    dispatch(setNot('Logged out successfully', 'success', 5))
  }

  const handleSignup = (event) => {
    event.preventDefault()
    if (!signup.username) {
      dispatch(setNot('Username is missing!', 'danger', 5))
      return
    } else if ((signup.passowrd || signup.confpassword) < 3) {
      dispatch(setNot('Password should be atleast 3 characters long', 'danger', 5))
      return
    } else if (!(signup.passowrd === signup.confpassword)) {
      dispatch(setNot('Passwords are unmatched', 'danger', 5))
      return
    }
    userService.Signup(signup)
      .then(response => {
        dispatch(signIn(response))
        window.localStorage.setItem('blogappuser', JSON.stringify(response))
        dispatch(setNot('Signed in successfully', 'success', 5))
        setSignup({ name: '', username: '', passowrd: '', confpassword: '' })
      })
      .catch(() => {
        dispatch(setNot('The credential you provided is invalid', 'danger', 5))
      })
  }

  const handleUsername = ({ target }) => {
    setUsername(target.value)
  }

  const handlePassword = ({ target }) => {
    setPassword(target.value)
  }

  const matchUser = useMatch('/users/:id')
  const userDetail = matchUser && users ?
    users.find(user => user.id === matchUser.params.id) : null

  const matchBlog = useMatch('/blogs/:id')
  const blogDetail = matchBlog && blogs ?
    blogs.find(blog => blog.id === matchBlog.params.id) : null

  const signuploginform =  <Togglable buttonLabel='signup / login'>
    <>
      <Button onClick={() => setToggle(!toggle)}>{toggle ? 'Login' : 'Signup'}</Button>
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
    <Button className='logout-btn' onClick={handleLogout}>logout</Button>
  </>

  const bloglists = <>
    <h2>blogs</h2>
    <Togglable buttonLabel='write a blog' ref={blogFormRef}>
      <BlogForm
        handleBlog={handleBlog} />
      <br/>
    </Togglable>
    {blogs && blogs.map(blog =>
      <Blog key={blog.id} blog={blog} username={user.username} handleDelete={handleDelete} handleLike={handleLike}/>
    )}
  </>

  const userlists = <>
    <UserList
      users={users} />
    <br/>
  </>

  return (
    <div>
      <Notification />
      {user.name && <Nav>
        <Link className='navele' to='/users/'>Users</Link>
        <Link className='navele' to='/blogs/'>Blogs</Link>
        <Link className='navele' to='/'>{logoutform}</Link>
      </Nav>}
      {!user.name && signuploginform}
      <hr/>
      <Routes>
        <Route path='/users/' element={user.name && userlists} />
        <Route path='/' element={user.name && bloglists} />
        <Route path='/users/:id' element={<UserDetail user={userDetail} />} />
        <Route path='/blogs/' element={user.name && bloglists} />
        <Route path='/blogs/:id' element={<BlogDetail blog={blogDetail} handleLike={handleLike} handleComment={handleComment}/>} />
      </Routes>
      <p>{!user.name && 'Sign in to the app to see the blogs and users'}</p>
    </div>
  )
}

export default App