// @flow
import React, {Component} from "react";
import {API_URL, fetchHeaders} from "../../App";
import Home from "./Home";

type Props = {
    onLogout: Function
}

export default class Logout extends Component<Props> {
    constructor(props: Props) {
        super(props);

        fetch(`${API_URL}/rest-auth/logout/`, {
            headers: fetchHeaders(),
            method: 'POST'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (typeof this.props.onLogout === "function") {
                        this.props.onLogout();
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
