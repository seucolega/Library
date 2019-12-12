import React, {Component} from "react";
// import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";

import Sidebar from "./Sidebar.jsx";
import Main from "./Main.jsx";
import cookie from "react-cookies";

export const FETCH_HEADERS = {
    'Content-Type': 'application/json',
    'X-CSRFToken': cookie.load("csrftoken")
};

export const API_URL = '/api';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <Main/>
                </div>
            </Router>
        );
    }
}
