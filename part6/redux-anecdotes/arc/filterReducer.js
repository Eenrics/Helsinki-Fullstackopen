const SET_FILTER = 'SET_FILTER'
const initialState = /(?:)/

const filterReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_FILTER:
            let filter = action.payload.filter
            return RegExp(filter)
        default:
            return state
    }
}

export const createFilter = (filter) => {
    return {type: SET_FILTER, payload: {filter}}
}

export default filterReducer