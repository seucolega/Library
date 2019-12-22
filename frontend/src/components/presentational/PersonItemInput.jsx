// @flow
import React, {Component} from "react";
import PersonTypeInput from "./PersonTypeInput";
import PersonProfileInput from "./PersonProfileInput";
import {API_URL, FETCH_HEADERS} from "../container/App";
import Button from "react-bootstrap/Button";

type Props = {
    personProfileList: Array<Object>,
    personTypeList: Array<Object>,
    bookPerson: Object
};

type State = {
    id: number,
    person: null | number,
    type: Array<number>,
    confirmToRemove?: boolean
};

export default class PersonItemInput extends Component<Props, State> {
    _person: { current: null | React$ElementRef<React$ElementType> };
    _type: { current: null | React$ElementRef<React$ElementType> };

    constructor(props: Props) {
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

    handlePersonChange(selected: Array<Object>) {
        this.setState({
            person: typeof selected[0] != 'undefined' ? selected[0] : null
        }, () => {
            this.saveChanges();
        });
    }

    handleTypeChange(selected: Array<Object>) {
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

        const payload: Object = {
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
                    this.setState({id: result.id})
                }
            })
    }

    handleRemove(action: void | string) {
        const id = this.state.id;

        if (!id) {
            this.setState({id: 0});
            return;
        }

        if (this.state.confirmToRemove && action === 'remove') {
            fetch(`${API_URL}/book/person/${id}/`, {
                method: 'DELETE',
                headers: FETCH_HEADERS
            })
                .then(() => {
                    this.setState({id: 0});
                })
        }

        this.setState({
            confirmToRemove: !this.state.confirmToRemove
        });
    }

    render() {
        if (this.state.id < 1) {
            return <></>;
        }

        const {bookPerson, personProfileList, personTypeList} = this.props;
        let buttonRemoveText;
        let buttonRemoveVariant;
        if (this.state.confirmToRemove) {
            buttonRemoveText = 'Confirma exclusão?';
            buttonRemoveVariant = 'danger';
        } else if (this.state.id) {
            buttonRemoveText = 'Excluir';
            buttonRemoveVariant = 'outline-danger';
        } else {
            buttonRemoveText = 'Cancelar';
            buttonRemoveVariant = 'outline-secondary';
        }

        return (
            <div className="pt-3 pb-4 px-3 border-top">
                <div>
                    <PersonProfileInput ref={this._person}
                                        id={bookPerson.id | 0}
                                        personTypeList={personProfileList}
                                        selected={personProfileList.filter(({id}) => {
                                            return id === bookPerson.person
                                        })}
                                        onChange={this.handlePersonChange.bind(this)}/>

                    <PersonTypeInput ref={this._type}
                                     id={bookPerson.id}
                                     personTypeList={personTypeList}
                                     selected={bookPerson.type}
                                     onChange={this.handleTypeChange.bind(this)}/>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <Button variant={buttonRemoveVariant}
                            onClick={this.handleRemove.bind(this, 'remove')}>
                        {buttonRemoveText}
                    </Button>
                    {
                        this.state.confirmToRemove ? (
                            <Button variant="secondary"
                                    className="ml-2"
                                    onClick={this.handleRemove.bind(this)}>
                                Cancelar
                            </Button>
                        ) : null
                    }
                </div>
            </div>
        )
    }
}
