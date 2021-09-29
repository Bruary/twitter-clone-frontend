import React, { useState } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import axios from 'axios'
import './SignupPage.css'


export default function SignupPage() {

    //let history = useHistory()

    const [errMsg, setErrMsg] = useState(null)
    const [notificstionMsg, setNotificationMsg] = useState(null)

    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        age: 0,
        email: '',
        password: ''
    })

    const handleSubmit = async (event) => {

        // to prevent sending any request/ refreshing page
        event.preventDefault()

        // validate inputs
        if (!state.firstName ||
            !state.lastName ||
            !state.age ||
            !state.email ||
            !state.password) {
            setErrMsg("Please fill in the missing fields.")
        }

        // Call the backend to add a user
        const url = "http://localhost:4000/api/v1/auth/signup"


        let response

        try {
            response = await axios.post(url, {
                "firstName": state.firstName,
                "lastName": state.lastName,
                "age": Number(state.age),
                "email": state.email,
                "password": state.password
            })
        } catch (error) {
            setErrMsg(error.response.data.Msg)
            setNotificationMsg(null)
            return
        }

        if (response.status === 200) {
            setErrMsg(null)
            setNotificationMsg("Account created successfully! Login now to access your account.")
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
        < form className="signup-form" onSubmit={handleSubmit}>
            <div className="inner-form">
                <div className="information-control">
                    <div>
                        {errMsg ? getErrorEle() : null}
                    </div>
                    <div>
                        {notificstionMsg ? getNotificationEle() : null}
                    </div>
                    <label>Firstname</label>
                    <input type="text" value={state.firstName} onChange={e => setState({ ...state, firstName: e.target.value })}></input>
                </div>
                <div className="information-control">
                    <label>Lastname</label>
                    <input type="text" value={state.lastName} onChange={e => setState({ ...state, lastName: e.target.value })}></input>
                </div>
                <div className="information-control">
                    <label>Age</label>
                    <input type="number" value={state.age} onChange={e => setState({ ...state, age: e.target.value })}></input>
                </div>
                <div className="information-control">
                    <label>Email</label>
                    <input type="email" value={state.email} onChange={e => setState({ ...state, email: e.target.value })}></input>
                </div>
                <div className="information-control">
                    <label>Password</label>
                    <input type="password" value={state.password} onChange={e => setState({ ...state, password: e.target.value })}></input>
                </div>
                <div className="buttons">
                    <button type="submit" onClick={handleSubmit}>Register</button>
                </div>
                <div className="buttons">
                    <Link to="/api/v1/auth/signin"> Return to login</Link>
                </div>
            </div>
        </form >

    )
}