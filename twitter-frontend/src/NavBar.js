import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import './NavBar.css'

export default class NavBar extends Component {
    render() {
        return (
            <Router>
                <nav className="navbar">
                    <div>
                        <ul className="menu-list">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/explore">Explore</Link></li>
                            <li><Link to="/notifications">Notifications</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/more">More</Link></li>
                        </ul>
                    </div>
                </nav>

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/explore" component={Explore} />
                    <Route path="/notifications" component={Notifications} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/more" component={More} />
                </Switch>

            </Router>
        )
    }
}

// function Home() {
//     return <h2>Home</h2>
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