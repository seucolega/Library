import React, {Component} from "react";
import BookList from "./BookList";
import BookItem from "./BookItem";
import BookItemNew from "./BookItemNew";

export const verboseName = 'Book';
export const verboseNamePlural = 'Books';

export default class Book extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            list: []
        };
    }

    render() {
        const id = this.props.match.params.id;
        if (id === 'new') {
            return <BookItemNew/>
        } else if (id > 0) {
            return <BookItem id={id}/>
        } else {
            return <BookList/>
        }
    }
}