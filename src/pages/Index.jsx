import React, { Component } from 'react'
import {Link} from 'react-router-dom' 

export default class Index extends Component {
    render() {
        return (
            <section className="hero is-light">
            <div className="hero-body">
                <div className="container">
                <h1 className="title">
                    Index
                </h1>
                <h2 className="subtitle">
                    React + Hasura = ReactList ❤️
                </h2>
                <Link className="button is-link is-outlined" to="/todoList">Go to Todolist!</Link>
                </div>
            </div>
            </section>
        )
    }
}
