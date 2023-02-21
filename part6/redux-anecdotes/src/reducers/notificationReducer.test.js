import notificationReducer from "./notificationReducer";
import deepFreeze from "deep-freeze";

describe("notificationReducer", () => {

    const initialState = 'helsinki'

    test("initial notifications are returned with undefined state", () => {
        
        const action = {
            type: 'notification/do_nothing',
            payload: 'do_not_dispaly_this'
        }
        const newState = notificationReducer(undefined, action)
        expect(newState).toHaveLength(0)
        expect(newState).toBe('')
    })

    test("notificatino state is not changed with wrong action", () => {
        
        const action = {
            type: 'notification/do_nothing',
            payload: 'do_not_dispaly_this'
        }
        const state = initialState

        deepFreeze(state)
        const newState = notificationReducer(state, action)
        expect(newState).toHaveLength(initialState.length)
        expect(newState).toBe(initialState)
    })

    test("notification can be added with right action", () => {
        
        const action = {
            type: 'notification/createNotification',
            payload: 'dispaly_this'
        }
        const state = initialState

        deepFreeze(state)
        const newState = notificationReducer(state, action)
        expect(newState).toBe('dispaly_this')
    })

    test("notification can be removed with right action", () => {
        
        const action = {
            type: 'notification/deleteNotification',
        }
        const state = initialState

        deepFreeze(state)
        const newState = notificationReducer(state, action)
        expect(newState).toHaveLength(0)
        expect(newState).toBe('')
    })
      
})