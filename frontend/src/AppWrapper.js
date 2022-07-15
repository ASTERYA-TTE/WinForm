import React, { useEffect } from 'react'
import { Route, useLocation, withRouter } from 'react-router-dom'
import App from './App'
import { Login } from './pages/Login'
import FormCreator from './components/FormCreator/FormCreator.js'

const AppWrapper = () => {
  let location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  switch (location.pathname) {
    case '/login':
      return <Route path='/login' component={Login} />
    case '/edit':
      return <Route path='/edit' component={FormCreator} />
    default:
      return <App />
  }
}

export default withRouter(AppWrapper)
