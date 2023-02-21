import { useReducer, useContext, createContext } from "react";

const SET = 'SET'
const CLEARE = 'CLEARE'

export const setNotification = (message) => {
    return {type: SET, payload: message}
}

export const clearNotification = () => {
    return {type: CLEARE}
}

const notificationReducer = (state, action) => {
    switch(action.type) {
        case SET:
            return action.payload
        case CLEARE:
            return ''
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]} >
            {props.children}
        </NotificationContext.Provider>  )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export default NotificationContext