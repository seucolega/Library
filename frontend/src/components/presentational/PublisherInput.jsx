import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import {Typeahead} from "react-bootstrap-typeahead";

export default class PublisherInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            list: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch("/api/book/publisher/")
            .then(res => res.json())
            .then(
                (result) => {
                    const list = result.results;
                    const selected = list.filter((item) => {
                        return this.props.value === item.id
                    });
                    this.setState({
                        isLoaded: true,
                        list: list,
                        defaultSelected: selected
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

    handleChange(selected) {
        this.setState({selected}, () => {
            this.props.onChange();
        });
    }

    render() {
        const {error, isLoaded, list, defaultSelected} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Form.Group controlId="publisher">
                    <Form.Label column="">Editora</Form.Label>
                    <Typeahead
                        id="publisher"
                        labelKey="name"
                        options={list}
                        onChange={this.handleChange}
                        defaultSelected={defaultSelected}
                        allowNew
                        newSelectionPrefix="Nova editora: "
                        placeholder="Nome da editora"/>
                </Form.Group>
            )
        }
    }
}