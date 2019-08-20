import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom'
import "bulma/css/bulma.min.css"
import "../shared.css"

export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/" exact="true">
                        <img src="https://avatars2.githubusercontent.com/u/39895671?s=400&v=4" alt="logo" className="logo"/>
                        <h1>ReactList</h1>
                    </Link>

                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navMenu" className="navbar-menu">
                    <div className="navbar-start">
                    <NavLink to="/" exact="true" className="navbar-item" activeClassName="activo">Home</NavLink>
                    <NavLink to="/todolist/" exact="true" className="navbar-item" activeClassName="activo">Todolist</NavLink>
                    </div>
                </div>
            </nav>
        )
    }

    componentDidMount(){

        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
      
        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {
      
          // Add a click event on each of them
          $navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {
              // Get the target from the "data-target" attribute
              const target = el.dataset.target;
              const $target = document.getElementById(target);
              // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
              el.classList.toggle('is-active');
              $target.classList.toggle('is-active');
      
            });
          });
        }
    }
}
