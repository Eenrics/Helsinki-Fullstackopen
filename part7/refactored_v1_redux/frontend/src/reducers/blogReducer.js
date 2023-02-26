import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      return state.concat(action.payload)
    },
    updateBlog(state, action) {
      return state.map(blog => blog.id !== action.payload.id ? blog : { ...blog, likes: action.payload.likes })
    },
    deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
    setBlog(state, action) {
      return action.payload
    }
  }
})

export const { appendBlog, updateBlog, setBlog, deleteBlog } = blogSlice.actions

export default blogSlice.reducer