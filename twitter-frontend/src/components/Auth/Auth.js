/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useState, useContext, useReducer } from 'react'
import './Auth.css'
import userContext from '../../context/userContext'
import { BrowserRouter as Router, Link } from 'react-router-dom'

export default function Auth() {

    const { user, setUser } = useContext(userContext)

    const [page, setPage] = useState({ isLoginPage: true, isSignupPage: false, isForgotPassPage: false })
    const [errMsg, setErrMsg] = useState(null)

    const emailElement = React.createRef()
    const passwordElement = React.createRef()

    const fillUserDetails = (resp) => {
        return { token: resp.data.token, accountID: resp.data.accountID }
    }

    const handleSubmit = async (event) => {
        // to prevent sending any request/ refreshing page
        event.preventDefault()

        // when you have a ref, you can access the element using .current
        const email = emailElement.current.value
        const password = passwordElement.current.value

        const url = "http://localhost:4000/api/v1/auth/signin"

        let err
        const response = await axios.post(url, {
            "email": email,
            "password": password

        }).catch(function (error) {
            err = error
        })

        if (err) {
            setErrMsg(err.response.data.Msg)
            return
        }

        setUser(fillUserDetails(response))
    }

    return (
        <form className="login-form" >
            <div className="inner-form">
                <div className="credentials-control">
                    <div> {errMsg &&
                        <div className="err">
                            <div class="alert alert-primary d-flex align-items-center" role="alert">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>
                                <div>
                                    {errMsg}
                                </div>
                            </div>
                        </div>}
                    </div>
                    <label>Email</label>
                    <input type="email" ref={emailElement}></input>
                </div>
                <div className="credentials-control">
                    <label>Password</label>
                    <input type="password" ref={passwordElement}></input>
                </div>

                <div className="main-column">
                    <div className="buttons secondary">
                        <Link to="/api/v1/auth/resetPassword">Forgot password?</Link>
                    </div>
                    <div className="col-1">
                        <div className="buttons primary">
                            <button onClick={handleSubmit}><Link to="/api/v1/auth/signin" >login</Link></button>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="buttons primary">
                            <Link to="/api/v1/auth/signup">Register</Link>
                        </div>
                    </div>

                </div>

            </div>
        </form >
    )


}
