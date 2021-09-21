import React, { Component, useState } from 'react'
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import userContext from './context/userContext'
import SignupPage from './components/Auth/SignupPage'

const signinPath = "/api/v1/auth/signin"
const signpPath = "/api/v1/auth/signup"

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

// export default class App extends Component {

//   state = {
//     token: '',
//     accountID: ''
//   }

//   login = (token, accountID) => {
//     this.setState({ token: token, accountID: accountID })
//   }

//   logout = () => {
//     this.setState({ token: '', accountID: '' })
//   }


//   render() {
//     return (
//       <BrowserRouter>
//         <AuthContext.Provider value={{
//           token: this.state.token,
//           accountID: this.state.accountID,
//           login: this.login,
//           logout: this.logout
//         }}>
//           <Switch>
//             {!this.state.token && <Redirect from="/" to={signinPath} exact />}
//             {this.state.token && <Redirect from="/" to="/home" exact />}
//             {!this.state.token && <Redirect from="/home" to={signinPath} exact />}
//             {this.state.token && <Redirect from={signinPath} to="/home" exact />}
//             {!this.state.token && <Route path={signinPath} exact component={Auth} />}
//             {this.state.token && <Route path="/home" exact component={NavBar} />}
//             {this.state.token && <Route path="/explore" exact component={Explore} />}
//             {this.state.token && <Route path="/notifications" exact component={Notifications} />}
//             {this.state.token && <Route path="/profile" exact component={Profile} />}
//             {this.state.token && <Route path="/more" exact component={More} />}
//           </Switch>
//         </AuthContext.Provider>
//       </BrowserRouter>
//     );
//   }

// }

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
