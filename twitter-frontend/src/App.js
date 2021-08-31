import React, { Component } from 'react'
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import AuthContext from './context/auth-context'

export default class App extends Component {

  state = {
    token: '',
    accountID: ''
  }

  login = (token, accountID) => {
    this.setState({ token: token, accountID: accountID })
  }

  logout = () => {
    this.setState({ token: '', accountID: '' })
  }


  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider value={{
          token: this.state.token,
          accountID: this.state.accountID,
          login: this.login,
          logout: this.logout
        }}>
          <Switch>
            {!this.state.token && <Redirect from="/" to="/auth" exact />}
            {this.state.token && <Redirect from="/" to="/home" exact />}
            {!this.state.token && <Redirect from="/home" to="/auth" exact />}
            {this.state.token && <Redirect from="/auth" to="/home" exact />}
            {!this.state.token && <Route path="/auth" exact component={Auth} />}
            {this.state.token && <Route path="/home" exact component={NavBar} />}
            {this.state.token && <Route path="/explore" exact component={Explore} />}
            {this.state.token && <Route path="/notifications" exact component={Notifications} />}
            {this.state.token && <Route path="/profile" exact component={Profile} />}
            {this.state.token && <Route path="/more" exact component={More} />}
          </Switch>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }

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
