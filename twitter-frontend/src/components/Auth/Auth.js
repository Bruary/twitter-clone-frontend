import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Home from '../Home/Home'
import './Auth.css'
import AuthContext from '../../context/auth-context'


export default class Auth extends Component {

    constructor(props) {
        super(props)

        this.state = {
            errMsg: ''
        }

        this.emailElement = React.createRef()
        this.passwordElement = React.createRef()
        this.token = ''

    }

    static contextType = AuthContext

    handleSubmit = async (event) => {
        // to prevent sending any request
        event.preventDefault()

        // when you have a ref, you can access the element using .current
        const email = this.emailElement.current.value
        const password = this.passwordElement.current.value

        const url = "http://localhost:4000/signin/"
        const response = await axios.post(url, {
            "email": email,
            "password": password
        })

        if (response.status === 401) {
            this.setState({
                errMsg: "Invalid credentials. Please try again with valid credentials."
            })
        }

        console.log("resp: ", response)

        const token = response.data.token

        this.context.login(token, "#BBFE219635")

    }

    render() {
        return (
            <form className="login-form" onSubmit={this.handleSubmit}>
                <div className="inner-form">
                    <div className="err">
                        <p>{this.state.errMsg}</p>
                    </div>
                    <div className="credentials-control">
                        <label>Email</label>
                        <input type="email" ref={this.emailElement}></input>
                    </div>
                    <div className="credentials-control">
                        <label>Password</label>
                        <input type="password" ref={this.passwordElement}></input>
                    </div>
                    <div className="buttons">
                        <button type="submit">Login</button>
                        <button type="button">Register</button>
                    </div>
                </div>
            </form>
        )
    }
}