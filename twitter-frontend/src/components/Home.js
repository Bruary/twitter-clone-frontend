import React, { Component } from 'react'
import './Home.css'

export default class Home extends Component {
    render() {
        return (
            <div className="row">
                <div className="column left">
                    <h2>Hello Home 1</h2>
                </div>

                <div className="column middle">
                    <h2>Hello Home 2</h2>
                </div>

                <div className="column right">
                    <h2>Hello Home 3</h2>
                </div>
            </div>
        )
    }
}