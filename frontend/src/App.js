import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";

import Sidebar from "./components/container/Sidebar.jsx";
import Main from "./components/container/Main.jsx";
// import logo from './logo.svg';


export default function App() {
    return (
        <Router>
            <div className="App">
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <Main/>
                </div>
            </div>
        </Router>
    );
}
