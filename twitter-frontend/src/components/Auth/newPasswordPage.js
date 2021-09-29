import React, { useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import './newPasswordPage.css'

export default function NewPasswordPage() {
    const [password, setPassword] = useState(null)

    const [errMsg, setErrMsg] = useState(null)
    const [notificstionMsg, setNotificationMsg] = useState(null)

    const handleSubmit = async () => {

        let url = "http://localhost:4000/api/v1/auth/resetPassword/newPassword"
        let response

        try {

            response = await axios.post(url, {
                "token": window.location.href.split('token=')[1],
                "password": password
            })
            console.log("the response: ", response)

        } catch (error) {
            setErrMsg(error.response.data.Msg)
            setNotificationMsg(null)
            return
        }

        if (response.status === 200) {
            setErrMsg(null)
            setNotificationMsg("New Password have been set!")
        }

    }

    const getErrorEle = () => {

        return (
            <div className="err">
                <div class="alert alert-primary d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                    <div>
                        {errMsg}
                    </div>
                </div>
            </div>
        )

    }

    const getNotificationEle = () => {

        return (
            <div class="container">
                <div class="alert alert-success">
                    <div class="icon hidden-xs">
                        <i class="fa fa-check"></i>
                    </div>
                    <strong>Success!</strong>
                    <br /> {notificstionMsg}
                </div>
            </div>
        )

    }

    return (
        <div>
            <header className="header">
                <h2>New Password</h2>
            </header>

            <div className="col-1">
                <h1>hi</h1>
            </div>

            < form className="forgotPassword-form col-2" onSubmit={handleSubmit}>
                <div className="inner-form">
                    <div className="notify-container">
                        {errMsg ? getErrorEle() : null}
                    </div>
                    <div className="notify-container">
                        {notificstionMsg ? getNotificationEle() : null}
                    </div>
                    <div className="information-control">
                        <label>New Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                    </div>
                    <div className="buttons">
                        <button type="submit" onClick={handleSubmit} ><a href="#1">Confirm</a></button>
                    </div>
                    <div className="buttons">
                        <Link to="/api/v1/auth/signin"> Return to login</Link>
                    </div>
                </div>
            </form >

            <div className="col-3">
                <h1>bye</h1>
            </div>


        </div>


    )
}