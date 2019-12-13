import React, {Component} from "react";
import AgeClassificationItemForm from "./AgeClassificationItemForm";
import PageHeader from "../presentational/PageHeader";

export default class AgeClassificationItemNew extends Component {
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
                <PageHeader title="Nova classificação etária"/>
                <AgeClassificationItemForm item={this.state.item}/>
            </div>
        )
    }
}