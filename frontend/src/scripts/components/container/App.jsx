import React from "react";
// import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";

import Sidebar from "./Sidebar.jsx";
import Main from "./Main.jsx";


export default class App extends React.Component {
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
