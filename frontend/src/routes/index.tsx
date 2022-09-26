import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../App.js'
import Dashboard from '../pages/Dashboard/Dashboard'
import FormCreator from '../components/FormEditor/FormEditor'
import Login from '../pages/Login'
import UserLogin from '../pages/UserLogin'

function index() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/home',
      element: <App />,
      children: [
        {
          path: '/home',
          element: <Dashboard />,
        },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'userlogin',
      element: <UserLogin />,
    },
    {
      path: 'editor',
      element: <FormCreator />,
    },
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default index
