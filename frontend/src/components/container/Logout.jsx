// @flow
import React, {Component} from "react";
import {API_URL} from "../../App";
import Home from "./Home";

type Props = {
    onLogout: Function
}

export default class Logout extends Component<Props> {
    constructor(props: Props) {
        super(props);

        fetch(`${API_URL}/rest-auth/logout/`, {
            headers: {},
            method: 'POST'
        })
            .then(res => res.json())
            .then(
                () => {
                    if (typeof this.props.onLogout === "function") {
                        this.props.onLogout();
                    }
                }
            )
    }

    render() {
        return <Home/>;
    }
}
