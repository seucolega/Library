// @flow
import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Book from "./Book";
import Publisher from "./Publisher";
import AgeClassification from "./AgeClassification";
import TextualClassification from "./TextualClassification";
import {PrivateRoute} from "../../App";
import TopNav from "../presentational/TopNav";
import LoginPage from "./LoginPage";
import Inventory from "./Inventory";

type Props = {
    isLoggedIn: boolean,
    onLogin: Function,
    onLogout: Function
}

export default class Main extends Component<Props> {
    render() {
        const isLoggedIn = this.props.isLoggedIn;

        return (
            <div id="main">
                {isLoggedIn ?
                    <TopNav isLoggedIn={isLoggedIn}
                            onLogout={this.props.onLogout}/>
                    :
                    <></>
                }

                <div className="container-fluid p-4 pb-5">
                    <Switch>
                        <Route path="/login">
                            {isLoggedIn ?
                                <Redirect to={{pathname: '/'}}/>
                                :
                                <LoginPage onLogin={this.props.onLogin}/>
                            }
                        </Route>
                        <PrivateRoute isLoggedIn={isLoggedIn}
                                      exact path="/"
                                      component={Home}/>
                        <PrivateRoute isLoggedIn={isLoggedIn}
                                      exact path="/book"
                                      component={Book}/>
                        <PrivateRoute isLoggedIn={isLoggedIn}
                                      path="/book/:id"
                                      component={Book}/>
                        <PrivateRoute isLoggedIn={isLoggedIn}
                                      exact path="/publisher"
                                      component={Publisher}/>
                        <PrivateRoute isLoggedIn={isLoggedIn}
                                      exact path="/publisher/:id"
                                      component={Publisher}/>
                        <PrivateRoute isLoggedIn={isLoggedIn}
                                      exact path="/age_classification"
                                      component={AgeClassification}/>
                        <PrivateRoute isLoggedIn={isLoggedIn}
                                      exact path="/age_classification/:id"
                                      component={AgeClassification}/>
                        <PrivateRoute isLoggedIn={isLoggedIn}
                                      exact path="/textual_classification"
                                      component={TextualClassification}/>
                        <PrivateRoute isLoggedIn={isLoggedIn}
                                      exact path="/textual_classification/:id"
                                      component={TextualClassification}/>
                        <PrivateRoute isLoggedIn={isLoggedIn}
                                      exact path="/inventory"
                                      component={Inventory}/>
                    </Switch>
                </div>
            </div>
        )
    }
}