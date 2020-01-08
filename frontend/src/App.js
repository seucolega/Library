// @flow
import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "react-bootstrap-typeahead/css/Typeahead.min.css"
import "./App.css"
import {BrowserRouter as Router} from "react-router-dom";

import Sidebar from "./components/container/Sidebar.jsx";
import Main from "./components/container/Main.jsx";
import cookie from "react-cookies";

// export const API_URL = '/api';

const csrfToken = cookie.load('csrftoken');

export function fetchHeaders() {
    return {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
        'Authorization': this.state ? `Token ${this.state.token}` : null
    }
}

type Props = {}

type State = {
    isLoggedIn: boolean,
    token: null | string
}

export default class App extends Component<Props, State> {
    handleLogin(key: string) {
        this.setState({
            isLoggedIn: Boolean(key),
            token: key
        });
    }

    handleLogout() {
        if (this.state && this.state.isLoggedIn) {
            window.location.replace('/');
        }
    }

    render() {
        const isLoggedIn = this.state ? this.state.isLoggedIn : false;

        return (
            <Router>
                <div className="App">
                    <div className="d-flex" id="wrapper">
                        <Sidebar isLoggedIn={isLoggedIn}/>
                        <Main onLogin={this.handleLogin.bind(this)}
                              onLogout={this.handleLogout.bind(this)}/>
                    </div>
                </div>
            </Router>
        )
    }
}
