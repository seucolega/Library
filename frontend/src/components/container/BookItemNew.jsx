import React, {Component} from "react";
import BookItemForm from "./BookItemForm";
import PageHeader from "../presentational/PageHeader";

export default class BookItemNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            item: {
                title: '',
                original_title: '',
                publisher: '',
                age_classification: [],
                textual_classification: []
            }
        };
    }

    render() {
        return (
            <div>
                <PageHeader title="Novo livro"/>
                <BookItemForm item={this.state.item}/>
            </div>
        )
    }
}