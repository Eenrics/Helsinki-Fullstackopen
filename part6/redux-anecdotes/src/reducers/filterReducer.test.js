import filterReducer from "./filterReducer";
import deepFreeze from "deep-freeze"

describe("filterReducer", () => {
    const initialState = /reduxtoolkit/

    test("returns a proper initial state when called with undefined state", () => {
        const action = {
            type: 'filter/do_nothing',
            payload: 'do_nothing'
        }

        const newState = filterReducer(undefined, action)
        expect(newState.toString()).toEqual('/(?:)/')
    })

    test("filter state is not changed with invalid action", () => {
        const action = {
            type: 'filter/do_nothing',
            payload: 'do_nothing'
        }
        const state = initialState

        deepFreeze(state)
        const newState = filterReducer(state, action)
        expect(newState.toString()).toEqual('/reduxtoolkit/')
    })

    test("filter state is changed with right action", () => {
        const action = {
            type: 'filter/createFilter',
            payload: 'do_nothing'
        }
        const state = initialState

        deepFreeze(state)
        const newState = filterReducer(state, action)
        expect(newState.toString()).toEqual('/do_nothing/')
    })
})