// @flow
import React, {Component} from "react";
import BookItemForm from "./BookItemForm";
import PageHeader from "../presentational/PageHeader";
import {API_URL, fetchHeaders} from "../../App";

type Props = {
    id: number
}

type State = {
    item: Object,
    isLoading: boolean,
    error: void | Object
}


export default class BookItem extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            item: null,
            isLoading: true,
            error: null
        };
    }

    componentDidMount() {
        fetch(`${API_URL}/book/book/${this.props.id}/`, {
            headers: fetchHeaders()
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        item: result,
                        isLoading: false,
                        error: result.error
                    });
                },
                (error) => {
                    this.setState({
                        isLoading: false,
                        error: error
                    });
                }
            )
    }

    render() {
        const {item, isLoading, error} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (isLoading) {
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