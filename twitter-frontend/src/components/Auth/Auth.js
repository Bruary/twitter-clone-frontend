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

        // Incase you are setting correct creds after invalid creds trial
        this.setState({
            errMsg: ''
        })

        // when you have a ref, you can access the element using .current
        const email = this.emailElement.current.value
        const password = this.passwordElement.current.value

        const url = "http://localhost:4000/signin/"

        let err
        const response = await axios.post(url, {
            "email": email,
            "password": password

        }).catch(function (error) {
            err = error
        })

        if (err) {
            this.setState({
                errMsg: err.response.data.Msg
            })
            return
        }

        const token = response.data.token
        this.context.login(token, "#BBFE219635")

    }

    render() {
        return (
            <form className="login-form" onSubmit={this.handleSubmit}>
                <div className="inner-form">
                    <div className="credentials-control">
                        <div> {this.state.errMsg &&
                            <div className="err">
                                <div class="alert alert-primary d-flex align-items-center" role="alert">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                    </svg>
                                    <div>
                                        {this.state.errMsg}
                                    </div>
                                </div>
                            </div>}
                        </div>
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