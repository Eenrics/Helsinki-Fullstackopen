import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import style from './index.css' //eslint-disable-line
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)