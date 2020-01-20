// @flow
import React, {Component} from "react";
import Page from "./Page";

type Props = {
    match?: Object
}

export default class Home extends Component<Props> {
    render() {
        return <Page title="Home"/>;
    }
}
