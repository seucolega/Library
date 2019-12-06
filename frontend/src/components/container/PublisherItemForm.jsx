import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import cookie from "react-cookies";
import {stringifyFormData} from "./Main";
import Alert from "react-bootstrap/Alert";

export default class PublisherItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const method = this.props.item.id ? 'PUT' : 'POST';

        let url = `/api/book/publisher/`;
        if (method === 'PUT') {
            url += `${this.props.item.id}/`;
        }

        const data = new FormData(event.target);

        this.setState({
            isLoading: true,
            res: stringifyFormData(data)
        });

        fetch(url, {
            method: method,
            body: data,
            headers: {
                'X-CSRFToken': cookie.load("csrftoken")
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoading: false,
                        error: result.error || true
                    });
                },
                (error) => {
                    this.setState({
                        isLoading: false,
                        error: true
                    });
                }
            )
    }

    render() {
        if (this.state.error === true) {
            window.history.back();
        }

        let alert;
        if (this.state.error) {
            alert = <Alert variant="danger">{this.state.error}</Alert>
        }

        return (
            <div>
                {alert}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="form_name">
                        <Form.Label column="">Nome</Form.Label>
                        <Form.Control name="name" defaultValue={this.props.item.name} placeholder="Nome da editora"/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-2" disabled={this.state.isLoading}>
                        Salvar
                    </Button>
                </Form>
            </div>
        )
    }
}