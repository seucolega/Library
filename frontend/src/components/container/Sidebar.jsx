// @flow
import React, {Component} from "react";
import ListGroup from "react-bootstrap/ListGroup"
import {LinkContainer} from 'react-router-bootstrap'

type Props = {
    // isLoggedIn: boolean
}

export default class Sidebar extends Component<Props> {
    render() {
        // const isLoggedIn = this.props.isLoggedIn;
        const isLoggedIn = true;

        return (
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading border-bottom">Start Bootstrap</div>
                <ListGroup variant="flush" className="border-bottom">
                    <LinkContainer exact to="/">
                        <ListGroup.Item action>Início</ListGroup.Item>
                    </LinkContainer>
                    {isLoggedIn && <>
                        <LinkContainer to="/book">
                            <ListGroup.Item action>Livros</ListGroup.Item>
                        </LinkContainer>
                        <LinkContainer to="/publisher">
                            <ListGroup.Item action>Editoras</ListGroup.Item>
                        </LinkContainer>
                        <LinkContainer to="/age_classification">
                            <ListGroup.Item action>Classificação etária</ListGroup.Item>
                        </LinkContainer>
                        <LinkContainer to="/textual_classification">
                            <ListGroup.Item action>Classificação textual</ListGroup.Item>
                        </LinkContainer>
                        <LinkContainer to="/inventory">
                            <ListGroup.Item action>Inventário</ListGroup.Item>
                        </LinkContainer>
                        {/*<LinkContainer to="/person">*/}
                        {/*    <ListGroup.Item action>Pessoas</ListGroup.Item>*/}
                        {/*</LinkContainer>*/}
                    </>
                    }
                </ListGroup>
            </div>
        )
    }
}