import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return { message: action.payload.message, type: action.payload.type }
    },
    cleateNotification() {
      return null
    }
  }
})

export const { setNotification, cleateNotification } = notificationSlice.actions

export const setNot = (msg, typ, sec) => {
  return async dispatch => {
    dispatch(setNotification({ message: msg, type: typ }))
    setTimeout(() => {
      dispatch(cleateNotification())
    }, sec*1000)
  }
}

export default notificationSlice.reducer


