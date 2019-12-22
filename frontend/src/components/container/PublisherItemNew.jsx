// @flow
import React, {Component} from "react";
import PublisherItemForm from "./PublisherItemForm";
import PageHeader from "../presentational/PageHeader";

type Props = {}

type State = {
    item: Object
}

export default class PublisherItemNew extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            item: {
                name: '',
            }
        };
    }

    render() {
        return (
            <div>
                <PageHeader title="Nova editora"/>
                <PublisherItemForm item={this.state.item}/>
            </div>
        )
    }
}