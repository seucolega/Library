import React, {Component} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import BookListItem from "./BookListItem";
import PageHeader from "../presentational/PageHeader";
import {Link} from "react-router-dom";
import {API_URL} from "./App";

export default class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            list: []
        };
    }

    componentDidMount() {
        fetch(`${API_URL}/book/book/`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        list: result.results
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
        const {error, isLoaded, list} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <PageHeader title="Livros" buttons={
                        <Link to={`/book/new`} className="btn btn-xs btn-info">Novo livro</Link>
                    }/>
                    <ListGroup>
                        {list.map(item => (
                            <BookListItem key={item.id} item={item}/>
                        ))}
                    </ListGroup>
                </div>
            );
        }
    }
}