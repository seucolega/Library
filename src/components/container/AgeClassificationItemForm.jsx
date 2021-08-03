// @flow
import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {API_URL, fetchHeaders} from "../../App";
import AwesomeDebouncePromise from "awesome-debounce-promise";

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

    saveData = () => {
        this.setState({
            isLoading: true
        });

        const payload = {
            name: this.state.name
        };

        let url = `${API_URL}/book/age_classification/`;
        const method = this.props.item.id ? 'PUT' : 'POST';
        if (method === 'PUT') {
            url += `${this.props.item.id}/`;
        }

        fetch(url, {
            method: method,
            body: JSON.stringify(payload),
            headers: fetchHeaders()
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.error) {
                        this.setState({
                            isLoading: false,
                            error: result.error
                        });
                    }
                },
                (error) => {
                    this.setState({
                        isLoading: false,
                        error: error
                    });
                }
            );
    };
    saveDebounced = AwesomeDebouncePromise(this.saveData, 500);

    handleNameChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
        this.setState({
            name: event.target.value
        }, () => {
            this.saveDebounced();
        });
    };

    handleSubmit = (event: Event) => {
        event.preventDefault();
        this.saveDebounced();
    };

    goBack = () => {
        window.history.back();
    };

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
                                  placeholder="Classificação"/>
                </Form.Group>

                <div className="mt-2 d-flex justify-content-end">
                    <Button variant="secondary"
                            className="ml-2"
                            disabled={!this.state.isLoading}
                            onClick={this.goBack}>
                        Voltar
                    </Button>
                </div>
            </Form>
        )
    }
}