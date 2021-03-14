// @flow
import React, {Component} from "react";
import PageHeader from "../presentational/PageHeader";
import Form from "react-bootstrap/Form"
import Alert from "react-bootstrap/Alert"
import {API_URL, fetchHeaders} from "../../App";
import Card from "react-bootstrap/Card";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";

type Props = {
    match: Object
}

type State = {
    query: string,
    isLoading: boolean,
    response: void | Object
}

export default class Inventory extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            query: "",
            isLoading: false,
            response: null
        }
    }

    processBook = () => {
        this.setState({isLoading: true})

        const {query} = this.state
        if (query && query.length === 13) {
            const payload = {gtin: query}
            // const url = `${API_URL}/book/book/inventory/?${String(new URLSearchParams(payload))}`;
            const url = `${API_URL}/book/book/inventory/`;

            fetch(url, {
                method: "POST",
                headers: fetchHeaders(),
                body: JSON.stringify(payload),
            })
                .then(res => res.json())
                .then(
                    result => {
                        this.setState({
                            isLoading: false,
                            response: result
                        })
                        console.log(result)
                    }
                );
        }
    }

    handleQueryChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
        let value = event.target.value.match(/\d/g)
        if (value instanceof Array) {
            value = value.join("")
        }
        this.setState({query: String(value || "")}, this.processBook);
    };

    objectPropertiesToElements = (list: Array<Object>) => {
        // return list.map((item, index) =>
        //     <ListGroupItem key={index} className="d-flex justify-content-between">
        //         <span>{item.key}</span>
        //         <span>{item.value}</span>
        //     </ListGroupItem>
        // )
    }

    render() {
        const {query, isLoading, response} = this.state

        return (
            <div>
                <PageHeader title="Livros"/>

                <Alert variant="info" className="mb-4">Exemplo: 9788535906509, 7891040216154</Alert>

                <Form.Group controlId="query">
                    <Form.Label column="">Código de barras</Form.Label>
                    <Form.Control
                        name="query"
                        value={query}
                        onChange={this.handleQueryChange}
                        placeholder="Exemplo: 9788535906509"
                    />
                </Form.Group>

                {
                    isLoading ?
                        <Card className="my-2">
                            <Card.Body>
                                <p className="m-0 text-muted">{`Procurando ${query}`}</p>
                            </Card.Body>
                        </Card>
                        :
                        <>
                            <Card className="my-2">
                                {/*<Card.Img variant="top" src="holder.js/100px180?text=Image cap"/>*/}
                                <Card.Body>
                                    <Card.Title>{response ? response.title : ""}</Card.Title>
                                    {/*<Card.Text className="small font-weight-light">{description}</Card.Text>*/}
                                </Card.Body>
                                {/*{response.book ? bookElements : <></>}*/}
                            </Card>
                        </>
                }
            </div>
        )
    }
}