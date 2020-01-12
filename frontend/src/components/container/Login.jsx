// @flow
import React, {Component} from "react";
import {API_URL, fetchHeaders} from "../../App";
import Home from "./Home";

type Props = {
    onLogin: Function
}

export default class Login extends Component<Props> {
    constructor(props: Props) {
        super(props);

        const payload = {
            username: 'admin',
            // email: '',
            password: 'admin'
        };

        fetch(`${API_URL}/rest-auth/login/`, {
            headers: fetchHeaders(),
            method: 'POST',
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (typeof this.props.onLogin === "function") {
                        this.props.onLogin(result.key);
                    }

                    // this.setState({
                    //     item: result,
                    //     isLoading: false,
                    //     error: result.error
                    // });
                },
                (error) => {
                    // this.setState({
                    //     isLoading: false,
                    //     error: error
                    // });
                }
            )
    }

    render() {
        return <Home/>;
    }
}
