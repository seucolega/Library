// @flow
import React, {Component} from "react";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";

type Props = {
    isLoggedIn: boolean,
    onLogout: Function
}

export default class TopNav extends Component<Props> {
    render() {
        return (
            <Nav className="main-heading border-bottom justify-content-end">
                {this.props.isLoggedIn ? (
                    <Nav.Item>
                        <Nav.Link onClick={() => {this.props.onLogout()}}>
                            Sair
                        </Nav.Link>
                    </Nav.Item>
                ) : (
                    <Nav.Item>
                        <LinkContainer exact to="/login">
                            <Nav.Link>
                                Entrar
                            </Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                )}
            </Nav>
        )
    }
}