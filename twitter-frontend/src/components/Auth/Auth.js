import axios from 'axios'
import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import Home from '../Home/Home'
import './Auth.css'
import AuthContext from '../../context/auth-context'
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'
import SignupPage from './SignupPage'


export default class Auth extends Component {

    constructor(props) {
        super(props)

        this.state = {
            signupPath: "/api/v1/auth/signup",
            loginPath: "/api/v1/auth/signin",
            errMsg: '',
            isLoginPage: true,
            isSignupPage: false,
            isForgotPassPage: false
        }

        this.emailElement = React.createRef()
        this.passwordElement = React.createRef()

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

        const url = "http://localhost:4000/api/v1/auth/signin"

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

    handleClick = (event) => {
        event.preventDefault()
        let id = event.target.id

        console.log("the id:", id)

        if (id === "1") {
            console.log("came in 1?")
            // set the state for isForgotPassPage to true
            this.setState({
                isForgotPassPage: true,
                isLoginPage: false
            })
        }

        if (id === "2") {
            console.log("came in 2?")
            // set the state for isSignupPage to true
            this.setState({
                isSignupPage: true,
                isLoginPage: false
            })
            return
        }
    }

    getSignupPage = () => {

        console.log("is it getting here??")
        return (
            <form className="signup-form" >
                <div className="inner-form">
                    <div className="information-control">
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
                        <label>Firstname</label>
                        <input type="text" ref={this.emailElement}></input>
                    </div>
                    <div className="information-control">
                        <label>Lastname</label>
                        <input type="text" ref={this.passwordElement}></input>
                    </div>
                    <div className="information-control">
                        <label>Age</label>
                        <input type="number" ref={this.passwordElement}></input>
                    </div>
                    <div className="information-control">
                        <label>Email</label>
                        <input type="email" ref={this.passwordElement}></input>
                    </div>
                    <div className="information-control">
                        <label>Password</label>
                        <input type="password" ref={this.passwordElement}></input>
                    </div>
                    <div className="buttons">
                        <Link to={this.state.signupPath} onClick={this.handleClick} id={"2"}>Register</Link>
                    </div>
                </div>
            </form >
        )
    }

    getLoginPage = () => {
        console.log("what is working first")
        return (
            <Router>
                <form className="login-form" >
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

                        <div className="main-column">
                            <div className="buttons secondary">
                                <Link to="/resetpassword" onClick={this.handleClick} id={"1"}>Forgot password?</Link>
                            </div>


                            {/* onclick overwrites 'to', so we need to find another solution */}



                            <div className="col-1">
                                <div className="buttons primary">
                                    <Link to="/api/v1/auth/signin" onClick={this.handleSubmit}>login</Link>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="buttons primary">
                                    {/* <Link to="/api/v1/auth/signup" onClick={this.handleClick} id={"2"}>Register</Link> */}
                                    <Link to="/api/v1/auth/signup" onClick={this.handleClick} id={"2"}>Register</Link>
                                </div>
                            </div>

                        </div>

                    </div>
                </form >
            </Router>
        )
    }

    getForgotPassPage = () => {
        return (
            <h2>Hello</h2>
        )
    }

    render() {

        console.log("the states: ", this.state)

        if (this.state.isLoginPage && !this.state.isSignupPage && !this.state.isForgotPassPage)
            return this.getLoginPage()

        if (!this.state.isLoginPage && this.state.isSignupPage && !this.state.isForgotPassPage)
            return this.getSignupPage()

        if (!this.state.isLoginPage && !this.state.isSignupPage && this.state.isForgotPassPage)
            return this.getForgotPassPage()

        // return (
        //     <Router>
        //         {this.state.isLoginPage && !this.state.isSignupPage && !this.state.isForgotPassPage && this.getLoginPage()}
        //         {this.state.isSignupPage && !this.state.isLoginPage && !this.state.isForgotPassPage && this.getSignupPage()}
        //         {this.state.isForgotPassPage && !this.state.isSignupPage && !this.state.isLoginPage && this.getForgotPassPage()}

        //         {/* <Switch>
        //             <Route exact path="/api/v1/auth/signup" Component={this.getSignupPage()} />
        //             <Route exact path="/resetPassword" Component={this.getForgotPassPage()} />
        //         </Switch> */}
        //     </Router>
        // )
    }
}
