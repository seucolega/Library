// @flow
import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PublisherInput from "../presentational/PublisherInput";
import AgeClassificationInput from "../presentational/AgeClassificationInput";
import TextualClassificationInput from "../presentational/TextualClassificationInput";
import {API_URL, fetchHeaders} from "../../App";
import Alert from "react-bootstrap/Alert";
import PersonInput from "../presentational/PersonInput";
import AwesomeDebouncePromise from 'awesome-debounce-promise';

type Props = {
    item: Object
};

type State = {
    title: string,
    original_title: string,
    publisher: number,
    age_classification: Array<number>,
    textual_classification: Array<number>,
    person: Array<number>,
    isLoading: boolean,
    error: void | Object
};

export default class BookItemForm extends Component<Props, State> {
    _publisher: { current: null | React$ElementRef<React$ElementType> };
    _ageClassification: { current: null | React$ElementRef<React$ElementType> };
    _textualClassification: { current: null | React$ElementRef<React$ElementType> };
    _person: { current: null | React$ElementRef<React$ElementType> };

    constructor(props: Props) {
        super(props);
        this.state = {
            title: this.props.item.title,
            original_title: this.props.item.original_title,
            publisher: this.props.item.publisher,
            age_classification: this.props.item.age_classification,
            textual_classification: this.props.item.textual_classification,
            person: this.props.item.person_set || [],
            isLoading: true,
            error: null
        };

        this._publisher = React.createRef();
        this._ageClassification = React.createRef();
        this._textualClassification = React.createRef();
        this._person = React.createRef();
    }

    saveData = () => {
        this.setState({
            isLoading: true
        });

        const payload = {
            title: this.state.title,
            original_title: this.state.original_title,
            publisher: this.state.publisher,
            age_classification: this.state.age_classification,
            textual_classification: this.state.textual_classification,
            person_set: this.state.person
        };

        let url = `${API_URL}/book/book/`;
        const method = this.props.item.id ? 'PUT' : 'POST';
        if (method === 'PUT') {
            url += `${this.props.item.id}/`;
        }

        fetch(url, {
            method: method,
            body: JSON.stringify(payload),
            headers: fetchHeaders()
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.error) {
                        this.setState({
                            isLoading: false,
                            error: result.error
                        });
                    }
                },
                (error) => {
                    this.setState({
                        isLoading: false,
                        error: error
                    });
                }
            );
    };
    saveDebounced = AwesomeDebouncePromise(this.saveData, 500);

    handleTitleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
        this.setState({
            title: event.target.value
        }, () => {
            this.saveDebounced();
        });
    };

    handleOriginalTitleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
        this.setState({
            original_title: event.target.value
        }, () => {
            this.saveDebounced();
        });
    };

    handlePublisherChange = (value: number) => {
        this.setState({
            publisher: value
        }, () => {
            this.saveDebounced();
        });
    };

    handleAgeClassificationChange = (value: Array<number>) => {
        this.setState({
            age_classification: value
        }, () => {
            this.saveDebounced();
        });
    };

    handleTextualClassificationChange = (value: Array<number>) => {
        this.setState({
            textual_classification: value
        }, () => {
            this.saveDebounced();
        });
    };

    handleSubmit = (event: Event) => {
        event.preventDefault();
        this.saveDebounced();
    };

    goBack = () => {
        window.history.back();
    };

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
                                        selected={this.state.age_classification}
                                        onChange={this.handleAgeClassificationChange}/>

                <TextualClassificationInput ref={this._textualClassification}
                                            selected={this.state.textual_classification}
                                            onChange={this.handleTextualClassificationChange}/>

                <PersonInput ref={this._person}
                             bookId={this.props.item.id}
                             bookPersonList={this.state.person}/>

                <div className="mt-2 d-flex justify-content-end">
                    <Button variant="secondary"
                            className="ml-2"
                            disabled={!this.state.isLoading}
                            onClick={this.goBack}>
                        Voltar
                    </Button>
                </div>
            </Form>
        )
    }
}