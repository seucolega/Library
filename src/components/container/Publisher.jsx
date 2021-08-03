// @flow
import React, {Component} from "react";
import PublisherList from "./PublisherList";
import PublisherItem from "./PublisherItem";
import PublisherItemNew from "./PublisherItemNew";

type Props = {
    match: Object
}

export default class Publisher extends Component<Props> {
    render() {
        const id = this.props.match.params.id;
        if (id === 'new') {
            return <PublisherItemNew/>
        } else if (id > 0) {
            return <PublisherItem id={id}/>
        } else {
            return <PublisherList/>
        }
    }
}