import { createSlice } from '@reduxjs/toolkit'

const initialState = /(?:)/

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        createFilter(state, action){
            const filter = RegExp(action.payload)
            return filter
        }
    }
})

export const { createFilter } = filterSlice.actions
export default filterSlice.reducer