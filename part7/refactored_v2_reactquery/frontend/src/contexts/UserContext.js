import { useContext, useReducer, createContext } from 'react'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

const signIn = (usr) => {
  return { type: LOGIN, payload: usr }
}

const signOut = () => {
  return { type: LOGOUT }
}

const userReducer = (state, action) => {
  switch(action.type) {
  case LOGIN:
    return action.payload
  case LOGOUT:
    return ''
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDisp] = useReducer(userReducer, '')

  return (
    <UserContext.Provider value={[user, userDisp]}>
      { props.children }
    </UserContext.Provider>
  )
}

export const useUserVal = () => {
  const userValDisp = useContext(UserContext)
  return userValDisp[0]
}

export const useSignIn = () => {
  const userValDisp = useContext(UserContext)
  return (usr) => {
    userValDisp[1](signIn(usr))
  }
}

export const useSignOut = () => {
  const userValDisp = useContext(UserContext)
  return () => {
    userValDisp[1](signOut())
  }
}