// @flow
import React, {Component} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import {Button, ButtonGroup, ButtonToolbar, InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons'
import {LinkContainer} from "react-router-bootstrap";

type InventoryResponse = {
    id: number,
    gtin: string,
    title: string,
    publisher: {
        name: string
    },
    stock_quantity: number
};

type Props = {
    gtin: string,
    processItem: Function,
    response?: InventoryResponse,
    responseStatus?: number,
    isLoading?: boolean,
    error?: void | Object
};

type State = {
    // response: InventoryResponse,
    // responseStatus: number,
    // isLoading: boolean,
    // error: void | Object
};

export default class InventoryItem extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            response: {},
            responseStatus: 0,
            isLoading: true,
            error: null
        }
    }

    render() {
        const {gtin, processItem, isLoading, response, responseStatus, error} = this.props

        if (isLoading) {
            return (
                <Card className="my-2">
                    <Card.Body>
                        <p className="m-0 text-muted">{`Procurando ${gtin}`}</p>
                    </Card.Body>
                </Card>
            )
        } else if (response) {
            const {title} = response

            return (
                <Card className="my-2">
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text className="small font-weight-light">{response.publisher.name}</Card.Text>
                    </Card.Body>
                    <ListGroup variant="flush" className="p-0">
                        <ListGroup.Item className="d-flex pb-4 justify-content-between align-items-center">
                            <span>Quantidade atual</span>
                            <span>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <Button variant="primary"
                                                disabled={isLoading}
                                                onClick={() => !isLoading ? processItem(gtin, -1) : null}>
                                            <FontAwesomeIcon icon={faMinus}/>
                                        </Button>
                                    </InputGroup.Prepend>
                                    <Form.Control aria-label="Quantidade em estoque"
                                                  readOnly
                                                  value={response.stock_quantity}
                                                  style={{textAlign: "center", maxWidth: "4rem"}}/>
                                    <InputGroup.Append>
                                        <Button variant="primary"
                                                disabled={isLoading}
                                                onClick={() => !isLoading ? processItem(gtin, 1) : null}>
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </span>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup className="align-items-end pb-4">
                        <ButtonToolbar>
                            <ButtonGroup>
                                <LinkContainer to={`/book/${response.id}/`}>
                                    <Button>Mais informações</Button>
                                </LinkContainer>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </ListGroup>
                </Card>
            )
        } else {
            let alert
            if (responseStatus === 404) {
                alert = `Livro não encontrado: ${gtin}`
            } else {
                alert = error && error.message ? error.message : "Erro desconhecido"
            }

            return (
                <Card className="my-2">
                    <Card.Body>
                        <p className="m-0 text-warning">{alert}</p>
                    </Card.Body>
                </Card>
            )
        }
    }
}