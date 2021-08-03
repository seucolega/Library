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
    ean: string,
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

    handleProcessItem = (ean: string, quantity: number) => {
        const {list} = this.state
        let item = list.find(item => item.ean === ean) || {ean: String(ean), isLoading: false}

        if (item && !item.isLoading && ean && ean.length === 13) {
            this.setState({
                list: [...list.filter(item => item.ean !== ean), {...item, isLoading: true}]
            })
        } else {
            return
        }

        const url = `${API_URL}/book/book/inventory/`;
        const payload = {
            ean: ean,
            quantity: quantity
        }

        fetch(url, {method: "POST", headers: fetchHeaders(), body: JSON.stringify(payload)})
            .then(res => {
                item = {...item, responseStatus: res.status}
                this.setState({list: [...list.filter(item => item.ean !== ean), item]})
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
                    list: [...list.filter(item => item.ean !== ean), {...item, isLoading: false}]
                })
            )
    }

    handleQueryChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
        let ean = event.target.value.match(/\d/g) || ""
        if (ean instanceof Array) {
            ean = ean.join("")
        }
        if (ean && ean.length === 13) {
            this.handleProcessItem(String(ean), 1)
            ean = ""
        }
        this.setState({query: String(ean)})
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
                    {list.map(({ean, response, responseStatus}, index) => (
                        <InventoryItem key={index}
                                       ean={ean}
                                       response={response}
                                       responseStatus={responseStatus}
                                       processItem={this.handleProcessItem}/>
                    ))}
                </ListGroup>
            </div>
        )
    }
}