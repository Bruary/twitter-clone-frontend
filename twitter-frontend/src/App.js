import React, { useState } from 'react'
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Auth from './components/Auth/Auth'
import userContext from './context/userContext'
import SignupPage from './components/Auth/SignupPage'
import ForgotPasswordPage from './components/Auth/forgotPasswordPage'
import NewPasswordPage from './components/Auth/newPasswordPage'

const signinPath = "/api/v1/auth/signin"
const signpPath = "/api/v1/auth/signup"
const forgotPasswordPath = "/api/v1/auth/resetPassword"
const newPasswordPath = "/api/v1/auth/resetPassword/newPassword"

export default function App() {

  const [user, setUser] = useState({ token: null, accountID: null })

  return (
    <BrowserRouter>
      <userContext.Provider value={{ user, setUser }}>
        <Switch>
          {!user.token && <Redirect from="/" to={signinPath} exact />}
          {user.token && <Redirect from="/" to="/home" exact />}
          {!user.token && <Redirect from="/home" to={signinPath} exact />}
          {user.token && <Redirect from={signinPath} to="/home" exact />}
          {!user.token && <Route path={signinPath} exact component={Auth} />}
          {!user.token && <Route path={signpPath} exact component={SignupPage} />}
          {!user.token && <Route path={forgotPasswordPath} exact component={ForgotPasswordPage} />}
          {!user.token && <Route path={newPasswordPath} exact component={NewPasswordPage} />}
          {user.token && <Route path="/home" exact component={NavBar} />}
          {user.token && <Route path="/explore" exact component={Explore} />}
          {user.token && <Route path="/notifications" exact component={Notifications} />}
          {user.token && <Route path="/profile" exact component={Profile} />}
          {user.token && <Route path="/more" exact component={More} />}
        </Switch>
      </userContext.Provider>
    </BrowserRouter>
  )
}

function Explore() {
  return <h2>Explore is here</h2>
}
function Notifications() {
  return <h2>Notify me</h2>
}
function Profile() {
  return <h2>My profile</h2>
}
function More() {
  return <h2>More is needed</h2>
}
