import React, { Component } from 'react'
import './NavBar.css'

export default class NavBar extends Component {

    render() {
        return (
            <nav className="navbar">
                <div>
                    <ul className="menu-list">
                        <li><a>Home</a></li>
                        <li><a>Explore</a></li>
                        <li><a>Notifications</a></li>
                        <li><a>Profile</a></li>
                        <li><a>More</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}