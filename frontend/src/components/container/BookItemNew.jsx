// @flow
import React, {Component} from "react";
import BookItemForm from "./BookItemForm";
import PageHeader from "../presentational/PageHeader";

type Props = {};

export default class BookItemNew extends Component<Props> {
    render() {
        const item = {
            title: '',
            original_title: '',
            publisher: '',
            age_classification: [],
            textual_classification: [],
            person: [],
        };

        return (
            <div>
                <PageHeader title="Novo livro"/>
                <BookItemForm item={item}/>
            </div>
        )
    }
}