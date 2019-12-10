import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import {Typeahead} from "react-bootstrap-typeahead";

export default class AgeClassificationInput extends Component {
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
        fetch("/api/book/age_classification/")
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

    handleChange(selected) {
        this.setState({selected}, () => {
            this.props.onChange();
        });
    }

    render() {
        const {error, isLoaded, list, selected} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Form.Group controlId="age_classification">
                    <Form.Label column="">Classificação etária</Form.Label>
                    <Typeahead
                        id="age_classification"
                        labelKey="name"
                        options={list}
                        onChange={this.handleChange}
                        selected={selected}
                        multiple
                        allowNew
                        newSelectionPrefix="Nova classificação: "
                        placeholder="Nome da classificação"
                    />
                </Form.Group>
            )
        }
    }
}