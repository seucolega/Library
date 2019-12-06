import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PublisherInput from "../presentational/PublisherInput";
import AgeClassificationInput from "../presentational/AgeClassificationInput";
import TextualClassificationInput from "../presentational/TextualClassification";
import {stringifyFormData} from "./Main";

export default class BookItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.publisherInput = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const method = this.props.item.id ? 'PUT' : 'POST';

        let url = `/api/book/book/`;
        if (method === 'PUT') {
            url += `${this.props.item.id}/`;
        }

        const data = new FormData(event.target);
        data.append('publisher', this.publisherInput.current.state.selected);
        this.setState({
            res: stringifyFormData(data),
        });

        // fetch(url, {
        //     method: method,
        //     body: data,
        //     headers: {
        //         'X-CSRFToken': cookie.load("csrftoken")
        //     }
        // });
        console.log(stringifyFormData(data));
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="form_title">
                    <Form.Label column="">Título</Form.Label>
                    <Form.Control name="title" defaultValue={this.props.item.title} placeholder="Título do livro"/>
                </Form.Group>

                <Form.Group controlId="form_original_title">
                    <Form.Label column="">Título original</Form.Label>
                    <Form.Control name="original_title" defaultValue={this.props.item.original_title}
                                  placeholder="Título original do livro"/>
                </Form.Group>

                <PublisherInput ref={this.publisherInput} value={this.props.item.publisher}/>

                <AgeClassificationInput value={this.props.item.age_classification}/>

                <TextualClassificationInput value={this.props.item.textual_classification}/>

                <Button variant="primary" type="submit" className="mt-2">
                    Salvar
                </Button>
            </Form>
        )
    }
}