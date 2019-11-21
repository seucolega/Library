import React from "react";
// import ReactDOM from "react-dom";
import ListGroup from "react-bootstrap/ListGroup"
import {NavLink} from "react-router-dom";

export default class Sidebar extends React.Component {
    render() {
        return (
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading">Start Bootstrap</div>
                <ListGroup variant="flush">
                    {/*<ListGroup.Item action active href="#">Início</ListGroup.Item>*/}
                    <NavLink exact to="/"
                          className="list-group-item list-group-item-action"
                          activeClassName="active">
                        Início
                    </NavLink>
                    <NavLink to="/book"
                          className="list-group-item list-group-item-action"
                          activeClassName="active">
                        Livros
                    </NavLink>
                    <NavLink to="/person"
                          className="list-group-item list-group-item-action"
                          activeClassName="active">
                        Pessoas
                    </NavLink>
                </ListGroup>
            </div>
        )
    }
}