import React, {Component} from "react";
import PageHeader from "../presentational/PageHeader";
import PublisherItemForm from "./PublisherItemForm";
import {API_URL} from "./App";

export default class PublisherItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            item: null
        };
    }

    componentDidMount() {
        fetch(`${API_URL}/book/publisher/${this.props.id}/`)
            .then(res => res.json())
            .then(
                (result) => {
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
                    <PageHeader title="Editar editora"/>
                    <PublisherItemForm item={item}/>
                </div>
            );
        }
    }
}