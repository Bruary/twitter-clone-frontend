import React, { Component } from 'react'
import axios from 'axios'
import './Home.css'

export default class Home extends Component {

    state = {
        loading: true,
        resp: null
    }

    async componentDidMount() {
        const url = "http://localhost:4000/getTweets/"

        const response = await axios.post(url, {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyX1VVSUQiOiI1OGYyYjU0My0xMThmLTRiMDUtOThiMi1jMmZmZmRmNDlhN2QiLCJBY2NvdW50X0lEIjoiI0QyRkJDQjI4MUUiLCJleHAiOjE2MzA0Mjg3MzN9.Hn-c40DAWWtTEjOyXJELfDBt7j3UbdkEcdsAXARktP8"
        })

        console.log('user: ', response)
        this.setState({ resp: response.data, loading: false })
    }

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
                            {this.state.loading || !this.state.resp ? <h2>Loading...</h2> : <div>{<div>{JSON.stringify(this.state.resp.tweets[0].tweet)}</div>}</div>}
                        </div>
                    </div>
                    <div className="tweet-Container">
                        <div>
                            {this.state.loading || !this.state.resp ? <h2>Loading...</h2> : <div>{<div>{JSON.stringify(this.state.resp.tweets[1].tweet)}</div>}</div>}
                        </div>
                    </div>
                    <div className="tweet-Container">
                        <div>
                            {this.state.loading || !this.state.resp ? <h2>Loading...</h2> : <div>{<div>{JSON.stringify(this.state.resp.tweets[2].tweet)}</div>}</div>}
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