import React, {Component} from "react";
import TextualClassificationItemForm from "./TextualClassificationItemForm";
import PageHeader from "../presentational/PageHeader";

export default class TextualClassificationItemNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
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