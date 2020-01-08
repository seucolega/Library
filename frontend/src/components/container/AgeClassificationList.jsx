// @flow
import React, {Component} from "react";
import PageHeader from "../presentational/PageHeader";
import ListGroup from "react-bootstrap/ListGroup";
import AgeClassificationListItem from "./AgeClassificationListItem";
import {Link} from "react-router-dom";
import {API_URL, FETCH_HEADERS} from "./App";

type Props = {}

type State = {
    list: Array<Object>,
    isLoading: boolean,
    error: void | Object
}

export default class AgeClassificationList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            list: [],
            isLoading: true,
            error: null
        };
    }

    componentDidMount() {
        fetch(`${API_URL}/book/age_classification/`, {
            headers: FETCH_HEADERS
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        list: result.results,
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
        const {list, isLoading, error} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (isLoading) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <PageHeader title="Classificação etária" buttons={
                        <Link to={`/age_classification/new`} className="btn btn-xs btn-info">Nova classificação</Link>
                    }/>
                    <ListGroup>
                        {list.map(item => (
                            <AgeClassificationListItem key={item.id} item={item}/>
                        ))}
                    </ListGroup>
                </div>
            );
        }
    }
}