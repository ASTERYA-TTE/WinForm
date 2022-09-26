import 'react-app-polyfill/ie11'
import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Router from './routes'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducer from './redux/reducer/reducer.tsx'
import { store } from './redux/reduxYeniÇıkanKullanımı/store/store'
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_ADDRESS
axios.defaults.headers.post['Content-Type'] = 'application/json'

//const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
