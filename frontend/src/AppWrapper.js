import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import App from './App'
import { Login } from './pages/Login'
import FormCreator from './components/FormEditor/FormEditor'
import UserLogin from './pages/UserLogin'
const AppWrapper = () => {



  return (
    <Routes>
        
    </Routes>
  )

 
  switch (location.pathname) {
    case '/':
      return 
    case '/login':
      return <Route path='/login' component={Login} />
    case '/userlogin':
      return <Route path='/userlogin' component={UserLogin} />
    case '/editor':
      return <Route path='/editor' component={FormCreator} />
    case '/app':
      return <Route path='/app' component={App} />
    default:
      return <App />
  }
}

export default withRouter(AppWrapper)
