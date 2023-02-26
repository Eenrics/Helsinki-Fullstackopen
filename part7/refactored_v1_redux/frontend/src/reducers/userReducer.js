import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: '',
  reducers: {
    signIn(state, action) {
      return action.payload
    },
    signOut() {
      return ''
    }
  }
})

export const { signIn, signOut } = userSlice.actions

export default userSlice.reducer