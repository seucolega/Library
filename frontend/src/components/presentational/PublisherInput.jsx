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
    }

    componentDidMount() {
        fetch("/api/book/publisher/")
            .then(res => res.json())
            .then(
                (result) => {
                    const list = [];
                    result.results.map(item => (
                        list.push({
                            id: item.id,
                            label: item.name
                        })
                    ));
                    this.setState({
                        isLoaded: true,
                        list: list
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
        const {error, isLoaded} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Form.Group controlId="form_publisher">
                    <Form.Label column="">Editora</Form.Label>
                    <Typeahead
                        id="form_publisher"
                        options={this.state.list}
                        onChange={(selected) => {
                            this.setState({selected});
                            // this.props.onChange()
                        }}
                        selected={this.state.selected}
                        allowNew
                        newSelectionPrefix="Nova editora: "
                        placeholder="Nome da editora"
                    />
                </Form.Group>
            )
        }
    }
}