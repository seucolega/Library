// @flow
import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PublisherInput from "../presentational/PublisherInput";
import AgeClassificationInput from "../presentational/AgeClassificationInput";
import TextualClassificationInput from "../presentational/TextualClassificationInput";
import {API_URL, FETCH_HEADERS} from "./App";
import Alert from "react-bootstrap/Alert";
import PersonInput from "../presentational/PersonInput";

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
            person: this.props.item.person_set,
            isLoading: true,
            error: null
        };

        this._publisher = React.createRef();
        this._ageClassification = React.createRef();
        this._textualClassification = React.createRef();
        this._person = React.createRef();
    }

    handleTitleChange(event: SyntheticInputEvent<HTMLInputElement>) {
        this.setState({
            title: event.target.value
        }, () => {
            this.save();
        });
    }

    handleOriginalTitleChange(event: SyntheticInputEvent<HTMLInputElement>) {
        this.setState({
            original_title: event.target.value
        }, () => {
            this.save();
        });
    }

    handlePublisherChange(value: number) {
        this.setState({
            publisher: value
        }, () => {
            this.save();
        });
    }

    handleAgeClassificationChange(value: Array<number>) {
        this.setState({
            age_classification: value
        }, () => {
            this.save();
        });
    }

    handleTextualClassificationChange(value: Array<number>) {
        this.setState({
            textual_classification: value
        }, () => {
            this.save();
        });
    }

    goBack() {
        window.history.back();
    }

    save() {
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
        // console.log(payload);

        let url = `${API_URL}/book/book/`;
        const method = this.props.item.id ? 'PUT' : 'POST';
        if (method === 'PUT') {
            url += `${this.props.item.id}/`;
        }

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
                        // this.goBack();
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

    handleSubmit(event: Event) {
        event.preventDefault();
        this.save();
    }

    render() {
        let alert;
        if (this.state.error) {
            alert = <Alert variant="danger">{this.state.error}</Alert>
        }

        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
                {alert}

                <Form.Group controlId="title">
                    <Form.Label column="">Título</Form.Label>
                    <Form.Control name="title"
                                  value={this.state.title}
                                  onChange={this.handleTitleChange.bind(this)}
                                  placeholder="Título do livro"/>
                </Form.Group>

                <Form.Group controlId="for_original_title">
                    <Form.Label column="">Título original</Form.Label>
                    <Form.Control name="original_title"
                                  value={this.state.original_title}
                                  onChange={this.handleOriginalTitleChange.bind(this)}
                                  placeholder="Título original do livro"/>
                </Form.Group>

                <PublisherInput ref={this._publisher}
                                value={this.state.publisher}
                                onChange={this.handlePublisherChange.bind(this)}/>

                <AgeClassificationInput ref={this._ageClassification}
                                        selected={this.state.age_classification}
                                        onChange={this.handleAgeClassificationChange.bind(this)}/>

                <TextualClassificationInput ref={this._textualClassification}
                                            selected={this.state.textual_classification}
                                            onChange={this.handleTextualClassificationChange.bind(this)}/>

                <PersonInput ref={this._person}
                             bookId={this.props.item.id}
                             bookPersonList={this.state.person}/>

                <div className="mt-2 d-flex justify-content-end">
                    {/*<Button variant="primary"*/}
                    {/*        type="submit"*/}
                    {/*        disabled={!this.state.isLoading}>*/}
                    {/*    Salvar*/}
                    {/*</Button>*/}
                    {/*<Button variant="secondary"*/}
                    {/*        className="ml-2"*/}
                    {/*        disabled={!this.state.isLoading}*/}
                    {/*        onClick={this.goBack.bind(this)}>*/}
                    {/*    Cancelar*/}
                    {/*</Button>*/}
                    <Button variant="secondary"
                            className="ml-2"
                            disabled={!this.state.isLoading}
                            onClick={this.goBack.bind(this)}>
                        Voltar
                    </Button>
                </div>
            </Form>
        )
    }
}