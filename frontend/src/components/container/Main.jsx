import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import Book from "./Book";
// import Person from "./Person";
import Publisher from "./Publisher";
import AgeClassification from "./AgeClassification";
import TextualClassification from "./TextualClassification";

export default class Main extends Component {
    render() {
        return (
            <div id="main">
                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    {/*<button className="btn btn-primary" id="menu-toggle">Toggle Menu</button>*/}

                    {/*<button className="navbar-toggler" type="button" data-toggle="collapse"*/}
                    {/*        data-target="#navbarSupportedContent"*/}
                    {/*        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">*/}
                    {/*    <span className="navbar-toggler-icon"></span>*/}
                    {/*</button>*/}

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="container-fluid p-4 pb-5">
                    <Switch>
                        <Route exact path="/" component={Home}/>
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

export function stringifyFormData(fd) {
    const data = {};
    for (let key of fd.keys()) {
        data[key] = fd.get(key);
    }
    return JSON.stringify(data, null, 2);
}