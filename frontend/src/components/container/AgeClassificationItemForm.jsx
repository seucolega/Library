// @flow
import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {API_URL, fetchHeaders} from "../../App";

type Props = {
    item: Object
}

type State = {
    name: string,
    isLoading: boolean,
    error: void | Object
}

export default class AgeClassificationItemForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            name: this.props.item.name,
            isLoading: false,
            error: null
        };
    }

    goBack() {
        window.history.back();
    }

    handleNameChange(event: SyntheticInputEvent<HTMLInputElement>) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event: SyntheticInputEvent<HTMLInputElement>) {
        event.preventDefault();
        this.setState({isLoading: true});

        const method = this.props.item.id ? 'PUT' : 'POST';

        let url = `${API_URL}/book/age_classification/`;
        if (method === 'PUT') {
            url += `${this.props.item.id}/`;
        }

        const payload = {
            name: this.state.name
        };

        fetch(url, {
            method: method,
            body: JSON.stringify(payload),
            headers: fetchHeaders()
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
            <Form onSubmit={this.handleSubmit.bind(this)}>
                {alert}

                <Form.Group controlId="form_name">
                    <Form.Label column="">Nome</Form.Label>
                    <Form.Control name="name"
                                  value={this.state.name}
                                  onChange={this.handleNameChange.bind(this)}
                                  placeholder="Classificação"/>
                </Form.Group>

                <div className="mt-2">
                    <Button variant="primary" type="submit" disabled={this.state.isLoading}>
                        Salvar
                    </Button>
                    <Button variant="secondary" className="ml-2" disabled={this.state.isLoading} onClick={this.goBack.bind(this)}>
                        Cancelar
                    </Button>
                </div>
            </Form>
        )
    }
}