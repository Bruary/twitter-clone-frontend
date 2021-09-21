import React, { Component, useContext } from 'react'
import axios from 'axios'
import './Home.css'
import { userContext } from '../../context/userContext'

export default class Home extends Component {

    state = {
        loading: true,
        resp: null
    }

    // static contextType = AuthContext

    // async componentDidMount() {
    //     const url = "http://localhost:4000/getTweets/"

    //     const response = await axios.post(url, {
    //         token: this.context.token
    //     })

    //     console.log('user: ', response)
    //     this.setState({ resp: response.data, loading: false })
    // }

    render() {
        return (
            <div className="row">
                <div className="column left">
                    <h2>

                    </h2>
                </div>

                <div className="column middle">
                    <div className="tweet-Container">
                        <div>
                            {/* {this.state.loading || !this.state.resp ? <h2>Loading...</h2> : <div>{<div>{JSON.stringify(this.state.resp.tweets[0].tweet)}</div>}</div>} */}
                        </div>
                    </div>
                    <div className="tweet-Container">
                        <div>
                            {/* {this.state.loading || !this.state.resp ? <h2>Loading...</h2> : <div>{<div>{JSON.stringify(this.state.resp.tweets[1].tweet)}</div>}</div>} */}
                        </div>
                    </div>
                    <div className="tweet-Container">
                        <div>
                            {/* {this.state.loading || !this.state.resp ? <h2>Loading...</h2> : <div>{<div>{JSON.stringify(this.state.resp.tweets[2].tweet)}</div>}</div>} */}
                        </div>
                    </div>
                </div>

                <div className="column right">
                    <h2>

                    </h2>
                </div>
            </div>

        )
    }
}