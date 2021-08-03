// @flow
import React, {Component} from "react";
import BookItemForm from "./BookItemForm";
import PageHeader from "../presentational/PageHeader";

type Props = {};

export default class BookItemNew extends Component<Props> {
    render() {
        return (
            <div>
                <PageHeader title="Novo livro"/>
                <BookItemForm/>
            </div>
        )
    }
}