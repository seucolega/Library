// @flow
import React, {Component} from "react";
import {API_URL, fetchHeaders} from "../../App";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import styles from './LoginForm.css';

type Props = {
    onLogin: Function
}

type State = {
    username: string,
    password: string,
    isLoading: boolean,
    error: void | Object
}

export default class LoginForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            username: '',
            // email: '',
            password: '',
            isLoading: true,
            error: null
        };
    }

    handleSubmit = (event: Event) => {
        event.preventDefault();

        const payload = {
            username: this.state.username,
            // email: this.state.email,
            password: this.state.password
        };

        fetch(`${API_URL}/auth/token/login/`, {
            headers: fetchHeaders(),
            method: 'POST',
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.auth_token) {
                        if (typeof this.props.onLogin === "function") {
                            this.setState({
                                username: '', password: ''
                            });
                            this.props.onLogin(result.auth_token);
                        }
                    } else {
                        let error = 'Generic error.';
                        if (result.non_field_errors) {
                            error = result.non_field_errors;
                        } else if (result.detail) {
                            error = result.detail;
                        }
                        this.setState({
                            error: error
                        });

                    }
                }
            )
    };

    handleUsernameChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
        this.setState({
            username: event.target.value
        });
    };

    handlePasswordChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
        this.setState({
            password: event.target.value
        });
    };

    render() {
        let alert;
        if (this.state.error) {
            alert = <Alert variant="danger">{this.state.error}</Alert>
        }

        return (
            <Form onSubmit={this.handleSubmit}
                  className={`${styles.loginForm} loginForm`}>
                {alert}

                <Form.Group controlId="username">
                    <Form.Label column="">Nome de usuário</Form.Label>
                    <Form.Control name="username"
                                  value={this.state.username}
                                  onChange={this.handleUsernameChange}
                                  placeholder="Seu nome de usuário"
                                  required/>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label column="">Senha</Form.Label>
                    <Form.Control name="password"
                                  type="password"
                                  value={this.state.password}
                                  onChange={this.handlePasswordChange}
                                  placeholder="Sua senha"
                                  required/>
                </Form.Group>

                <div className="mt-2 d-flex justify-content-end">
                    <Button variant="primary"
                            type="submit">
                        Salvar
                    </Button>
                </div>
            </Form>
        );
    }
}
