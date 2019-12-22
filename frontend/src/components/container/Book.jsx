// @flow
import React, {Component} from "react";
import BookList from "./BookList";
import BookItem from "./BookItem";
import BookItemNew from "./BookItemNew";

// export const verboseName = 'Book';
// export const verboseNamePlural = 'Books';

type Props = {
    match: Object
}

export default class Book extends Component<Props> {
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