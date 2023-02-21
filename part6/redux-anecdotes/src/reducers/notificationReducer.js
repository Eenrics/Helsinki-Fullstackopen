import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(state, action){
            const notify = action.payload
            return notify
        },
        deleteNotification(state, action){
            return ''
        }
    }
})

export const { createNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer