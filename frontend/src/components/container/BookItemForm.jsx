import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PublisherInput from "../presentational/PublisherInput";
import AgeClassificationInput from "../presentational/AgeClassificationInput";
import TextualClassificationInput from "../presentational/TextualClassificationInput";
import {API_URL, FETCH_HEADERS} from "./App";
import Alert from "react-bootstrap/Alert";
import PersonInput from "../presentational/PersonInput";

export default class BookItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.item.title,
            original_title: this.props.item.original_title,
            publisher: this.props.item.publisher,
            age_classification: this.props.item.age_classification,
            textual_classification: this.props.item.textual_classification,
            person: this.props.item.person_set,
        };

        this._publisher = React.createRef();
        this._ageClassification = React.createRef();
        this._textualClassification = React.createRef();
        this._person = React.createRef();
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    handleOriginalTitleChange(event) {
        this.setState({original_title: event.target.value});
    }

    handlePublisherChange() {
        const selected = this._publisher.current.state.selected;

        const item = typeof selected[0] == 'undefined' ? null : selected[0];
        if (item) {
            if (item.customOption) {
                fetch(`${API_URL}/book/publisher/`, {
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
        const selected = this._ageClassification.current.state.selected;

        const toSet = selected.filter(({id}) => {
            return !isNaN(id);
        });
        this.setState({
            age_classification: toSet.map(({id}) => {
                return id
            })
        });

        const toInclude = selected.filter(({customOption, name}) => {
            return customOption === true && name;
        });

        for (let item of toInclude) {
            fetch(`${API_URL}/book/age_classification/`, {
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
        const selected = this._textualClassification.current.state.selected;

        const toSet = selected.filter(({id}) => {
            return !isNaN(id);
        });
        this.setState({
            textual_classification: toSet.map(({id}) => {
                return id
            })
        });

        const toInclude = selected.filter(({customOption, name}) => {
            return customOption === true && name;
        });

        for (let item of toInclude) {
            fetch(`${API_URL}/book/textual_classification/`, {
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

    handlePersonChange() {
        const selected = this._person.current.state.selected;

        const toSet = selected.filter(({id}) => {
            return !isNaN(id);
        });
        this.setState({
            person: toSet.map(({id}) => {
                return id
            })
        });

        const toInclude = selected.filter(({customOption, name}) => {
            return customOption === true && name;
        });

        // console.log(this.state.person, toInclude);

        // for (let item of toInclude) {
        //     fetch(`${API_URL}/book/textual_classification/`, {
        //         method: 'POST',
        //         body: JSON.stringify({name: item.name}),
        //         headers: FETCH_HEADERS
        //     })
        //         .then(res => res.json())
        //         .then(result => this.setState({
        //             textual_classification: [...this.state.textual_classification, result.id]
        //         }))
        // }
    }

    goBack() {
        window.history.back();
    }

    handleSubmit(event) {
        event.preventDefault();
        // this.setState({isLoading: true});

        const payload = {
            title: this.state.title,
            original_title: this.state.original_title,
            publisher: this.state.publisher,
            age_classification: this.state.age_classification,
            textual_classification: this.state.textual_classification,
            person_set: this.state.person
        };
        console.log(payload);

        let url = `${API_URL}/book/book/`;
        const method = this.props.item.id ? 'PUT' : 'POST';
        if (method === 'PUT') {
            url += `${this.props.item.id}/`;
        }

        // fetch(url, {
        //     method: method,
        //     body: JSON.stringify(payload),
        //     headers: FETCH_HEADERS
        // })
        //     .then(res => res.json())
        //     .then(
        //         (result) => {
        //             if (result.error) {
        //                 this.setState({
        //                     isLoading: false,
        //                     error: result.error
        //                 });
        //             } else {
        //                 this.goBack();
        //             }
        //         },
        //         (error) => {
        //             this.setState({
        //                 isLoading: false,
        //                 error: error
        //             });
        //         }
        //     );
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
                                        value={this.state.age_classification}
                                        onChange={this.handleAgeClassificationChange.bind(this)}/>

                <TextualClassificationInput ref={this._textualClassification}
                                            value={this.state.textual_classification}
                                            onChange={this.handleTextualClassificationChange.bind(this)}/>

                <PersonInput ref={this._person}
                             bookId={this.props.item.id}
                             value={this.state.person}
                             onChange={this.handlePersonChange.bind(this)}/>

                <div className="mt-2">
                    <Button variant="primary"
                            type="submit"
                            disabled={this.state.isLoading}>
                        Salvar
                    </Button>
                    <Button variant="secondary"
                            className="ml-2"
                            disabled={this.state.isLoading}
                            onClick={this.goBack.bind(this)}>
                        Cancelar
                    </Button>
                </div>
            </Form>
        )
    }
}