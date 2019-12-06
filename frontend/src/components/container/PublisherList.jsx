import React, {Component} from "react";
import PageHeader from "../presentational/PageHeader";
import ListGroup from "react-bootstrap/ListGroup";
import PublisherListItem from "./PublisherListItem";
import {Link} from "react-router-dom";

export default class PublisherList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            list: []
        };
    }

    componentDidMount() {
        fetch("/api/book/publisher/")
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
                    <PageHeader title="Editoras" buttons={
                        <Link to={`/publisher/new`} className="btn btn-xs btn-info">Nova editora</Link>
                    }/>
                    <ListGroup>
                        {list.map(item => (
                            <PublisherListItem key={item.id} item={item}/>
                        ))}
                    </ListGroup>
                </div>
            );
        }
    }
}