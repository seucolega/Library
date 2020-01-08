// @flow
// import React, {Component} from "react";
// import {BrowserRouter as Router} from "react-router-dom";
//
// import Sidebar from "./Sidebar.jsx";
// import Main from "./Main.jsx";
import cookie from "react-cookies";

export const API_URL = '/api';

export let FETCH_HEADERS = {
    'Content-Type': 'application/json',
    'X-CSRFToken': cookie.load('csrftoken'),
    'Authorization': ''
};

// type Props = {}
//
// type State = {
//     token: null | string
// }
//
// export default class App extends Component<Props, State> {
//     handleLogin(key: string) {
//         console.log('login');
//         this.setState({
//             token: key
//         });
//     }
//
//     handleLogout() {
//         console.log('logoff');
//         this.setState({
//             token: null
//         });
//     }
//
//     render() {
//         return (
//             <Router>
//                 <div className="d-flex" id="wrapper">
//                     <Sidebar/>
//                     <Main onLogin={this.handleLogin.bind(this)}
//                           onLogout={this.handleLogout.bind(this)}/>
//                 </div>
//             </Router>
//         );
//     }
// }
