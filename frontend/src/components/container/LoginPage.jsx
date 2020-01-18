// @flow
import React, {Component} from "react";
import LoginForm from "../presentational/LoginForm";

type Props = {
    onLogin: Function
}

export default class LoginPage extends Component<Props> {
    render() {
        return (
            <div>
                {/*<PageHeader title="Login"/>*/}
                <LoginForm onLogin={this.props.onLogin}/>
            </div>
        );
    }
}
