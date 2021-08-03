// @flow
import React, {Component} from "react";
import AgeClassificationItemForm from "./AgeClassificationItemForm";
import PageHeader from "../presentational/PageHeader";

type Props = {}

type State = {
    item: Object
}

export default class AgeClassificationItemNew extends Component<Props, State> {
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
                <PageHeader title="Nova classificação etária"/>
                <AgeClassificationItemForm item={this.state.item}/>
            </div>
        )
    }
}