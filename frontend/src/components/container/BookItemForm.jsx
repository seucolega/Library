import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PublisherInput from "../presentational/PublisherInput";
import AgeClassificationInput from "../presentational/AgeClassificationInput";
import TextualClassificationInput from "../presentational/TextualClassificationInput";
import {FETCH_HEADERS} from "./App";
import Alert from "react-bootstrap/Alert";

export default class BookItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.item.title,
            original_title: this.props.item.original_title,
            publisher: this.props.item.publisher,
            age_classification: this.props.item.age_classification,
            textual_classification: this.props.item.textual_classification,
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
        this.goBack = this.goBack.bind(this);
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    handleOriginalTitleChange(event) {
        this.setState({original_title: event.target.value});
    }

    handlePublisherChange() {
        const list = this._publisher.current.state.selected;

        const item = typeof list[0] == 'undefined' ? null : list[0];
        if (item) {
            if (item.customOption) {
                fetch('/api/book/publisher/', {
                    method: 'POST',
                    body: JSON.stringify({name: item.name}),
                    headers: FETCH_HEADERS
                })
                    .then(res => res.json())
                    .then(result => this.setState({publisher: result.id}))
            } else {
                this.setState({publisher: item.id});
            }
        }
    }

    handleAgeClassificationChange() {
        const list = this._ageClassification.current.state.selected;

        const toSet = list.filter(({id}) => {
            return !isNaN(id);
        });
        this.setState({
            age_classification: toSet.map(({id}) => {
                return id
            })
        });

        const toInclude = list.filter(({customOption, name}) => {
            return customOption === true && name;
        });

        for (let item of toInclude) {
            fetch('/api/book/age_classification/', {
                method: 'POST',
                body: JSON.stringify({name: item.name}),
                headers: FETCH_HEADERS
            })
                .then(res => res.json())
                .then(result => this.setState({
                    age_classification: [...this.state.age_classification, result.id]
                }))
        }
    }

    handleTextualClassificationChange() {
        const list = this._textualClassification.current.state.selected;

        const toSet = list.filter(({id}) => {
            return !isNaN(id);
        });
        this.setState({
            textual_classification: toSet.map(({id}) => {
                return id
            })
        });

        const toInclude = list.filter(({customOption, name}) => {
            return customOption === true && name;
        });

        for (let item of toInclude) {
            fetch('/api/book/textual_classification/', {
                method: 'POST',
                body: JSON.stringify({name: item.name}),
                headers: FETCH_HEADERS
            })
                .then(res => res.json())
                .then(result => this.setState({
                    textual_classification: [...this.state.textual_classification, result.id]
                }))
        }
    }

    goBack() {
        window.history.back();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({isLoading: true});

        let url = '/api/book/book/';
        const method = this.props.item.id ? 'PUT' : 'POST';
        if (method === 'PUT') {
            url += `${this.props.item.id}/`;
        }

        const payload = {
            title: this.state.title,
            original_title: this.state.original_title,
            publisher: this.state.publisher,
            age_classification: this.state.age_classification,
            textual_classification: this.state.textual_classification
        };

        fetch(url, {
            method: method,
            body: JSON.stringify(payload),
            headers: FETCH_HEADERS
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.error) {
                        this.setState({
                            isLoading: false,
                            error: result.error
                        });
                    } else {
                        this.goBack();
                    }
                },
                (error) => {
                    this.setState({
                        isLoading: false,
                        error: error
                    });
                }
            );
    }

    render() {
        let alert;
        if (this.state.error) {
            alert = <Alert variant="danger">{this.state.error}</Alert>
        }

        return (
            <Form onSubmit={this.handleSubmit}>
                {alert}

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

                <div className="mt-2">
                    <Button variant="primary" type="submit" disabled={this.state.isLoading}>
                        Salvar
                    </Button>
                    <Button variant="secondary" className="ml-2" disabled={this.state.isLoading} onClick={this.goBack}>
                        Cancelar
                    </Button>
                </div>
            </Form>
        )
    }
}