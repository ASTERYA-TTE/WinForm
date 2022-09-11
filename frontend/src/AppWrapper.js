import React, { useEffect } from 'react'
import { Route, useLocation, withRouter } from 'react-router-dom'
import App from './App'
import { Login } from './pages/Login'
import FormCreator from './components/FormEditor/FormEditor'
import UserLogin from './pages/UserLogin'
const AppWrapper = () => {
  let location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  switch (location.pathname) {
    case '/':
      return <Route path='/' component={Login} />
    case '/login':
      return <Route path='/login' component={Login} />
    case '/userlogin':
      return <Route path='/userlogin' component={UserLogin} />
    case '/edit':
      return <Route path='/edit' component={FormCreator} />
    case '/app':
      return <Route path='/app' component={App} />
    default:
      return <App />
  }
}

export default withRouter(AppWrapper)
