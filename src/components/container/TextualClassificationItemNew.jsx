import React, {Component} from "react";
import TextualClassificationItemForm from "./TextualClassificationItemForm";
import PageHeader from "../presentational/PageHeader";

type Props = {}

type State = {
    item: Object
}

export default class TextualClassificationItemNew extends Component<Props, State> {
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
                <PageHeader title="Nova classificação textual"/>
                <TextualClassificationItemForm item={this.state.item}/>
            </div>
        )
    }
}