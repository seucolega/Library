import React, {Component} from "react";
import PersonTypeInput from "./PersonTypeInput";
import PersonProfileInput from "./PersonProfileInput";
import {API_URL, FETCH_HEADERS} from "../container/App";

export default class PersonItemInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            person: this.props.bookPerson.person,
            type: this.props.bookPerson.type
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
        const payload = {
            person: this.state.person,
            type: this.state.type
        };

        fetch(`${API_URL}/book/person/${this.props.bookPerson.id}/`, {
            method: 'PATCH',
            body: JSON.stringify(payload),
            headers: FETCH_HEADERS
        })
            .then(res => res.json())
            // .then(result => this.setState({}))

    }

    render() {
        const {bookPerson, personProfileList, personTypeList} = this.props;

        return (
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
        )
    }
}
