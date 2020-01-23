// @flow
import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "react-bootstrap-typeahead/css/Typeahead.min.css"
import "./App.css"
import Sidebar from "./components/container/Sidebar.jsx";
import {Cookies, withCookies} from 'react-cookie';
import Main from "./components/container/Main";

export const API_URL = '/api';

let _csrfToken = null;
let _authorizationToken = null;

type Props = {
    cookies: Cookies
}

type State = {
    isLoggedIn: boolean,
}

class App extends Component<Props, State> {
    setAuthorizationToken(key: string) {
        _authorizationToken = key;
        this.setState({
            isLoggedIn: Boolean(key)
        });
    }

    async componentDidMount() {
        this.setAuthorizationToken(this.props.cookies.get('authorizationToken'));
        await getCsrfToken();
    }

    constructor(props: Props) {
        super(props);

        this.state = {
            isLoggedIn: false
        };
    }

    handleLogin(key: string) {
        this.setAuthorizationToken(key);
        this.props.cookies.set('authorizationToken', key, {
            path: '/',
            // TODO: Check the options below to improve security
            // secure: true,
            // httpOnly: true
        });
    }

    handleLogout() {
        if (this.state.isLoggedIn) {
            _authorizationToken = null;
            this.props.cookies.remove('authorizationToken');

            // window.location.replace('/');
            this.setState({
                isLoggedIn: Boolean(_authorizationToken)
            });
        }
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        return (
            <div className="App">
                <div className="d-flex" id="wrapper">
                    {isLoggedIn ?
                        <Sidebar isLoggedIn={true}/>
                        :
                        <></>
                    }

                    <Main isLoggedIn={isLoggedIn}
                          onLogin={this.handleLogin.bind(this)}
                          onLogout={this.handleLogout.bind(this)}/>
                </div>
            </div>
        )
    }
}

// async function testRequest(method) {
//     const response = await fetch(`${API_URL}/ping/`, {
//         method: method,
//         headers: (method === 'POST' ? {'X-CSRFToken': await getCsrfToken()} : {}),
//         credentials: 'include',
//     });
//     const data = await response.json();
//     return data.result;
// }

async function getCsrfToken() {
    if (_csrfToken === null) {
        const response = await fetch(`${API_URL}/csrf/`, {credentials: 'include'});
        const data = await response.json();
        _csrfToken = data.csrfToken;
    }
    return _csrfToken;
}

export const fetchHeaders: Object = () => {
    let headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken': _csrfToken
    };
    if (_authorizationToken) {
        headers = {...headers, Authorization: `Token ${_authorizationToken}`};
    }
    return headers;
};

export function PrivateRoute({children, component, isLoggedIn, ...rest}: Object) {
    if (isLoggedIn) {
        return <Route {...rest} component={component}/>
    } else {
        // return <Route {...rest}
        //               render={({location}) => <Redirect to={{
        //                   pathname: '/login',
        //                   state: {from: location}
        //               }}/>}/>;
        return <Route {...rest} render={() => <Redirect to={{pathname: '/login'}}/>}/>;
    }
}

export default withCookies(App);
