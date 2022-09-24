import 'react-app-polyfill/ie11'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import AppWrapper from './AppWrapper'
import axios from 'axios'
//import reportWebVitals from './reportWebVitals';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_ADDRESS
axios.defaults.headers.post['Content-Type'] = 'application/json'

ReactDOM.render(
  <BrowserRouter>
    <AppWrapper />
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
