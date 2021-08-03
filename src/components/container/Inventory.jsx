// @flow
import React, {Component} from "react";
import PageHeader from "../presentational/PageHeader";
import Form from "react-bootstrap/Form"
import Alert from "react-bootstrap/Alert"
import ListGroup from "react-bootstrap/ListGroup";
import InventoryItem from "./InventoryItem";
import {API_URL, fetchHeaders} from "../../App";

type Props = {
    match: Object
}

type InventoryItemValue = {
    gtin: string,
    response?: Object,
    responseStatus?: number,
    isLoading: boolean,
    error?: void | Object
}

type State = {
    query: string,
    list: Array<InventoryItemValue>
}

export default class Inventory extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            query: "",
            list: [],
            loadingItemList: []
        }
    }

    handleProcessItem = (gtin: string, quantity: number) => {
        const {list} = this.state
        let item = list.find(item => item.gtin === gtin) || {gtin: String(gtin), isLoading: false}

        if (item && !item.isLoading && gtin && gtin.length === 13) {
            this.setState({
                list: [...list.filter(item => item.gtin !== gtin), {...item, isLoading: true}]
            })
        } else {
            return
        }

        const url = `${API_URL}/book/book/inventory/`;
        const payload = {
            gtin: gtin,
            quantity: quantity
        }

        fetch(url, {method: "POST", headers: fetchHeaders(), body: JSON.stringify(payload)})
            .then(res => {
                item = {...item, responseStatus: res.status}
                this.setState({list: [...list.filter(item => item.gtin !== gtin), item]})
                return res.json()
            })
            .then(
                result => {
                    item = {...item, response: result}
                },
                error => {
                    item = {...item, error: JSON.stringify(error)}
                },
            )
            .finally(
                () => this.setState({
                    list: [...list.filter(item => item.gtin !== gtin), {...item, isLoading: false}]
                })
            )
    }

    handleQueryChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
        let gtin = event.target.value.match(/\d/g) || ""
        if (gtin instanceof Array) {
            gtin = gtin.join("")
        }
        if (gtin && gtin.length === 13) {
            this.handleProcessItem(String(gtin), 1)
            gtin = ""
        }
        this.setState({query: String(gtin)})
    }

    render() {
        const {query, list} = this.state

        return (
            <div>
                <PageHeader title="Inventário"/>

                <Alert variant="info" className="mb-4">Exemplos: 9788535906509, 7891040216154</Alert>

                <Form.Group controlId="query">
                    <Form.Label column="">Código de barras</Form.Label>
                    <Form.Control name="query"
                                  value={query}
                                  onChange={this.handleQueryChange}
                                  placeholder="Exemplo: 9788535906509"
                    />
                </Form.Group>

                <ListGroup>
                    {list.map(({gtin, response, responseStatus}, index) => (
                        <InventoryItem key={index}
                                       gtin={gtin}
                                       response={response}
                                       responseStatus={responseStatus}
                                       processItem={this.handleProcessItem}/>
                    ))}
                </ListGroup>
            </div>
        )
    }
}