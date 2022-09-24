import React, { useEffect } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from 'react-router-dom'
import App from './App'
import { Login } from './pages/Login'
import FormCreator from './components/FormEditor/FormEditor'
import UserLogin from './pages/UserLogin'
const AppWrapper = () => {
  const router = createBrowserRouter([
    {
      path: 'app',
      element: <App />,
    },
    {
      path: 'login',
      element: <Login />,
    },
  ])
  return (
    <div>
      {/* {router} */}
      <Routes>
        <Route path='/login' component={<Login />}></Route>
        <Route path='/userlogin' component={<UserLogin />}></Route>
        <Route path='/editor' component={<FormCreator />}></Route>
        <Route path='/app' component={<App />}></Route>
      </Routes>
    </div>
  )

  // switch (location.pathname) {
  //   case '/':
  //     return
  //   case '/login':
  //     return <Route path='/login' component={Login} />
  //   case '/userlogin':
  //     return <Route path='/userlogin' component={UserLogin} />
  //   case '/editor':
  //     return <Route path='/editor' component={FormCreator} />
  //   case '/app':
  //     return <Route path='/app' component={App} />
  //   default:
  //     return <App />
  // }
}

export default AppWrapper
