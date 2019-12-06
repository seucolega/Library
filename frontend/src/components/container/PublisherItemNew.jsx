import React, {Component} from "react";
import PublisherItemForm from "./PublisherItemForm";
import PageHeader from "../presentational/PageHeader";

export default class PublisherItemNew extends Component {
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
                <PageHeader title="Novo livro"/>
                <PublisherItemForm item={this.state.item}/>
            </div>
        )
    }
}