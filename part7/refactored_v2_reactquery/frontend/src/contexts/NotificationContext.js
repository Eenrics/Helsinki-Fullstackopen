import { useReducer, useContext, createContext } from 'react'

const SET = 'SET'
const CLEAR = 'CLEAR'

export const setNotification = (msg, typ) => {
  return { type: SET, payload: { msg, typ } }
}

export const clearNotification = () => {
  return { type: CLEAR }
}

const notificationReducer = (state, action) => {
  switch(action.type) {
  case SET:
    return { message: action.payload.msg, type: action.payload.typ }
  case CLEAR:
    return null
  default:
    return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {

  const [notification, notDispatch] = useReducer(notificationReducer, null)

  return (
    < NotificationContext.Provider value={[notification, notDispatch]} >
      { props.children }
    </NotificationContext.Provider>
  )
}

export const useNotValue = () => {
  const notValDisp = useContext(NotificationContext)
  return notValDisp[0]
}

export const useNot = () => {
  const notValDisp = useContext(NotificationContext)
  return (msg, typ, sec) => {
    notValDisp[1](setNotification(msg, typ))
    setTimeout(() => {
      notValDisp[1](clearNotification())
    }, sec*1000)
  }
}


export default NotificationContext