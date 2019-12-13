import React, {Component} from "react";
import PageHeader from "../presentational/PageHeader";
import ListGroup from "react-bootstrap/ListGroup";
import TextualClassificationListItem from "./TextualClassificationListItem";
import {Link} from "react-router-dom";
import {API_URL} from "./App";

export default class TextualClassificationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            list: []
        };
    }

    componentDidMount() {
        fetch(`${API_URL}/book/textual_classification/`)
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
                    <PageHeader title="Classificação textual" buttons={
                        <Link to={`/textual_classification/new`} className="btn btn-xs btn-info">Nova classificação</Link>
                    }/>
                    <ListGroup>
                        {list.map(item => (
                            <TextualClassificationListItem key={item.id} item={item}/>
                        ))}
                    </ListGroup>
                </div>
            );
        }
    }
}