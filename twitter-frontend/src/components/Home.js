import React, { Component } from 'react'
import './Home.css'

export default class Home extends Component {

    state = {
        loading: false,
        person: null
    }

    async componentDidMount() {
        const url = "http://localhost:4000/getTweets/"
        const response = await fetch(url)
        const data = await response.json()

        console.log('user: ', data.results[0])
        this.setState({ person: data.results[0], loading: false })
    }

    render() {
        return (
            <div className="row">
                <div className="column left">
                    <h2>Hello Home 1</h2>
                </div>

                <div className="column middle">
                    <h2>{this.state.loading || !this.state.person ? <h2>Loading...</h2> : <h2>{<div>{this.state.person.tweet}</div>}</h2>}</h2>
                </div>

                <div className="column right">
                    <h2>Hello Home 3</h2>
                </div>
            </div>
        )
    }
}