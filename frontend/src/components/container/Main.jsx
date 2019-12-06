import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import PageHome from "./PageHome";
import PageBook from "./PageBook";
import PagePerson from "./PagePerson";
import PagePublisher from "./PagePublisher";

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
                        <Route exact path="/" component={PageHome}/>
                        <Route exact path="/book" component={PageBook}/>
                        <Route path="/book/:id" component={PageBook}/>
                        <Route exact path="/publisher" component={PagePublisher}/>
                        <Route path="/publisher/:id" component={PagePublisher}/>
                        <Route exact path="/person" component={PagePerson}/>
                        <Route path="/person/:id" component={PagePerson}/>
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