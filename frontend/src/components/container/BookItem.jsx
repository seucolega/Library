import React, {Component} from "react";
import BookItemForm from "./BookItemForm";
import PageHeader from "../presentational/PageHeader";
import {API_URL} from "./App";

export default class BookItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            item: null
        };
    }

    componentDidMount() {
        fetch(`${API_URL}/book/book/${this.props.id}/`)
            .then(res => res.json())
            .then(
                (result) => {
                    result.person = result.person_set;
                    delete result.person_set;

                    this.setState({
                        isLoaded: true,
                        item: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, item} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <PageHeader title="Editar livro"/>
                    <BookItemForm item={item}/>
                </div>
            );
        }
    }
}