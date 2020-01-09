// @flow
import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import Book from "./Book";
import Publisher from "./Publisher";
import AgeClassification from "./AgeClassification";
import TextualClassification from "./TextualClassification";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";
import Login from "./Login";
import Logout from "./Logout";

type Props = {
    isLoggedIn: boolean,
    onLogin: Function,
    onLogout: Function
}

export default class Main extends Component<Props> {
    render() {
        return (
            <div id="main">
                <Nav className="main-heading border-bottom justify-content-end">
                    {this.props.isLoggedIn ? (
                        <Nav.Item>
                            <LinkContainer exact to="/logout">
                                <Nav.Link>Sair</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                    ) : (
                        <Nav.Item>
                            <LinkContainer exact to="/login">
                                <Nav.Link>Entrar</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                    )}
                </Nav>

                <div className="container-fluid p-4 pb-5">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        {/*<Route exact path="/login" component={Login} onLogin={this.props.onLogin}/>*/}
                        <Route exact path="/login"
                               render={(props) => <Login {...props} onLogin={this.props.onLogin}/>}/>
                        <Route exact path="/logout"
                               render={(props) => <Logout {...props} onLogout={this.props.onLogout}/>}/>
                        <Route exact path="/book" component={Book}/>
                        <Route path="/book/:id" component={Book}/>
                        <Route exact path="/publisher" component={Publisher}/>
                        <Route path="/publisher/:id" component={Publisher}/>
                        <Route exact path="/age_classification" component={AgeClassification}/>
                        <Route path="/age_classification/:id" component={AgeClassification}/>
                        <Route exact path="/textual_classification" component={TextualClassification}/>
                        <Route path="/textual_classification/:id" component={TextualClassification}/>
                        {/*<Route exact path="/person" component={PagePerson}/>*/}
                        {/*<Route path="/person/:id" component={PagePerson}/>*/}
                    </Switch>
                </div>
            </div>
        )
    }
}