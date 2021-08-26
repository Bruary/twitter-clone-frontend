import React, { Component } from 'react'
import axios from 'axios'
import './Home.css'

export default class Home extends Component {

    state = {
        loading: false,
        resp: null
    }

    async componentDidMount() {
        const url = "http://localhost:4000/getTweets/"

        const response = await axios.post(url, {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyVVVJRCI6ImFmYmMyMWQxLTY0NTctNDU1Yy1iZDM0LWQwMDUzYWU2MDdjNSIsImV4cCI6MTYyOTk5MTA1M30.WBstV1suzczPB152tAc5Kc6wb-EIpyGgoeaNUevrwKU"
        })

        console.log('user: ', response)
        this.setState({ resp: response.data, loading: false })
    }

    render() {
        return (
            <div className="row">
                <div className="column left">
                    <h2>Hello Home 1</h2>
                </div>

                <div className="column middle">
                    <div className="tweet-Container">
                        <h2>{this.state.loading || !this.state.resp ? <h2>Loading...</h2> : <div>{<div>{JSON.stringify(this.state.resp.tweets[0].tweet)}</div>}</div>}</h2>
                    </div>
                    <div className="tweet-Container">
                        <h2>{this.state.loading || !this.state.resp ? <h2>Loading...</h2> : <div>{<div>{JSON.stringify(this.state.resp.tweets[1].tweet)}</div>}</div>}</h2>
                    </div>
                    <div className="tweet-Container">
                        <h2>{this.state.loading || !this.state.resp ? <h2>Loading...</h2> : <div>{<div>{JSON.stringify(this.state.resp.tweets[2].tweet)}</div>}</div>}</h2>
                    </div>
                </div>

                <div className="column right">
                    <h2>Hello Home 3</h2>
                </div>
            </div>

        )
    }
}