import React, {Component} from "react";
import PersonTypeInput from "./PersonTypeInput";
import PersonProfileInput from "./PersonProfileInput";
import {API_URL, FETCH_HEADERS} from "../container/App";
import Button from "react-bootstrap/Button";

export default class PersonItemInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.bookPerson.id,
            person: this.props.bookPerson.person,
            type: this.props.bookPerson.type,
            confirmToRemove: false
        };

        this._person = React.createRef();
        this._type = React.createRef();
    }

    handlePersonChange(selected) {
        this.setState({
            person: typeof selected[0] != 'undefined' ? selected[0] : null
        }, () => {
            this.saveChanges();
        });
    }

    handleTypeChange(selected) {
        this.setState({
            type: selected
        }, () => {
            this.saveChanges();
        });
    }

    saveChanges() {
        const {person, type} = this.state;

        if (!person || !type.length) {
            return;
        }

        const payload = {
            person: person,
            type: type
        };

        const method = this.state.id ? 'PATCH' : 'POST';

        let url = `${API_URL}/book/person/`;
        if (method === 'POST') {
            payload.book = this.props.bookPerson.book;
        } else {
            url += `${this.state.id}/`;
        }

        fetch(url, {
            method: method,
            body: JSON.stringify(payload),
            headers: FETCH_HEADERS
        })
            .then(res => res.json())
        .then(result => {
            if (method === 'POST') {
                console.log(result);
                this.setState({id: result.id})
            }            
        })
    }

    handleRemove(action) {
        const id = this.state.id;

        if (this.state.confirmToRemove && action === 'remove') {
            fetch(`${API_URL}/book/person/${id}/`, {
                method: 'DELETE',
                headers: FETCH_HEADERS
            })
                .then(() => {
                    this.handleRemoveToParent(id);
                })
        }

        this.setState({confirmToRemove: !this.state.confirmToRemove});
    }

    handleRemoveToParent(id) {
        if (typeof this.props.onRemove === "function") {
            this.props.onRemove(id);
        }
    }

    render() {
        const {bookPerson, personProfileList, personTypeList} = this.props;

        return (
            <div>
                <div>
                    <PersonProfileInput ref={this._person}
                                        id={''}
                                        personTypeList={personProfileList}
                                        selected={personProfileList.filter(({id}) => {
                                            return id === bookPerson.person
                                        })}
                                        onChange={this.handlePersonChange.bind(this)}/>

                    <PersonTypeInput ref={this._type}
                                     id={''}
                                     personTypeList={personTypeList}
                                     selected={personTypeList.filter(({id}) => {
                                         return bookPerson.type.includes(id)
                                     })}
                                     onChange={this.handleTypeChange.bind(this)}/>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <Button variant={this.state.confirmToRemove ? 'danger' : 'outline-danger'}
                            onClick={this.handleRemove.bind(this, 'remove')}
                            disabled={this.state.isLoading}>
                        {this.state.confirmToRemove ? 'Confirma exclusão?' : 'Excluir'}
                    </Button>
                    {
                        this.state.confirmToRemove ? (
                            <Button variant="secondary"
                                    className="ml-2"
                                    onClick={this.handleRemove.bind(this)}
                                    disabled={this.state.isLoading}>Cancelar</Button>
                        ) : null
                    }

                </div>
            </div>
        )
    }
}
