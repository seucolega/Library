import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {API_URL, FETCH_HEADERS} from "./App";

export default class PublisherItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.item.name,
            error: null,
            isLoading: false
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        window.history.back();
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({isLoading: true});

        const method = this.props.item.id ? 'PUT' : 'POST';

        let url = `${API_URL}/book/publisher/`;
        if (method === 'PUT') {
            url += `${this.props.item.id}/`;
        }

        const payload = {
            title: this.state.title
        };

        fetch(url, {
            method: method,
            body: JSON.stringify(payload),
            headers: FETCH_HEADERS
        })
            .then(res => res.json())
            .then(
                result => {
                    if (result.error) {
                        this.setState({
                            isLoading: false,
                            error: result.error
                        });
                    } else {
                        this.goBack();
                    }
                },
                error => {
                    this.setState({
                        isLoading: false,
                        error: error
                    });
                }
            )
    }

    render() {
        let alert;
        if (this.state.error) {
            alert = <Alert variant="danger">{this.state.error}</Alert>
        }

        return (
            <Form onSubmit={this.handleSubmit}>
                {alert}

                <Form.Group controlId="form_name">
                    <Form.Label column="">Nome</Form.Label>
                    <Form.Control name="name"
                                  value={this.state.name}
                                  onChange={this.handleNameChange}
                                  placeholder="Nome da editora"/>
                </Form.Group>

                <div className="mt-2">
                    <Button variant="primary" type="submit" disabled={this.state.isLoading}>
                        Salvar
                    </Button>
                    <Button variant="secondary" className="ml-2" disabled={this.state.isLoading} onClick={this.goBack}>
                        Cancelar
                    </Button>
                </div>
            </Form>
        )
    }
}