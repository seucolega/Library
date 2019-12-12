import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import {Typeahead} from "react-bootstrap-typeahead";
import {API_URL} from "../container/App";

export default class TextualClassificationInput extends Component {
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
        fetch(`${API_URL}/book/textual_classification/`)
            .then(res => res.json())
            .then(
                (result) => {
                    const list = result.results;
                    const selected = list.filter((item) => {
                        return this.props.value.includes(item.id)
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
                <Form.Group controlId="textual_classification">
                    <Form.Label column="">Classificação textual</Form.Label>
                    <Typeahead
                        id="textual_classification"
                        labelKey="name"
                        options={list}
                        onChange={this.handleChange}
                        defaultSelected={defaultSelected}
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