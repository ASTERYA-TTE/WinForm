import 'react-app-polyfill/ie11'
import React from 'react'
import ReactDOM from 'react-dom'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import App from './App'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard/Dashboard';
import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_ADDRESS
axios.defaults.headers.post['Content-Type'] = 'application/json'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path:'/',
        element: <Dashboard />
      }
    ]
  },
  {
    path: 'login',
    element: <Login />,
  },
])

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
