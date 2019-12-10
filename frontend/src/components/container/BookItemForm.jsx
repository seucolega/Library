import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PublisherInput from "../presentational/PublisherInput";
import AgeClassificationInput from "../presentational/AgeClassificationInput";
import TextualClassificationInput from "../presentational/TextualClassificationInput";
import cookie from "react-cookies";

export default class BookItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            original_title: '',
            publisher: null,
            age_classification: null,
            textual_classification: null,
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleOriginalTitleChange = this.handleOriginalTitleChange.bind(this);
        this._publisher = React.createRef();
        this.handlePublisherChange = this.handlePublisherChange.bind(this);
        this._ageClassification = React.createRef();
        this.handleAgeClassificationChange = this.handleAgeClassificationChange.bind(this);
        this.handleTextualClassificationChange = this.handleTextualClassificationChange.bind(this);
        this._textualClassification = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    handleOriginalTitleChange(event) {
        this.setState({original_title: event.target.value});
    }

    handlePublisherChange() {
        this.setState({publisher: this._publisher.current.state.selected});
    }

    handleAgeClassificationChange() {
        this.setState({age_classification: this._ageClassification.current.state.selected});
    }

    handleTextualClassificationChange() {
        this.setState({textual_classification: this._textualClassification.current.state.selected});
    }

    handleSubmit(event) {
        event.preventDefault();

        let url = `/api/book/book/`;
        const method = this.props.item.id ? 'PUT' : 'POST';
        if (method === 'PUT') {
            url += `${this.props.item.id}/`;
        }

        fetch(url, {
            method: method,
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': cookie.load("csrftoken")
            }
        });
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Label column="">Título</Form.Label>
                    <Form.Control name="title"
                                  value={this.state.title}
                                  onChange={this.handleTitleChange}
                                  placeholder="Título do livro"/>
                </Form.Group>

                <Form.Group controlId="for_original_title">
                    <Form.Label column="">Título original</Form.Label>
                    <Form.Control name="original_title"
                                  value={this.state.original_title}
                                  onChange={this.handleOriginalTitleChange}
                                  placeholder="Título original do livro"/>
                </Form.Group>

                <PublisherInput ref={this._publisher}
                                value={this.state.publisher}
                                onChange={this.handlePublisherChange}/>

                <AgeClassificationInput ref={this._ageClassification}
                                        value={this.state.age_classification}
                                        onChange={this.handleAgeClassificationChange}/>

                <TextualClassificationInput ref={this._textualClassification}
                                            value={this.state.textual_classification}
                                            onChange={this.handleTextualClassificationChange}/>

                <Button variant="primary" type="submit" className="mt-2">
                    Salvar
                </Button>
            </Form>
        )
    }
}