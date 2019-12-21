import React, {Component} from "react";
import {API_URL, FETCH_HEADERS} from "../container/App";
import Form from "react-bootstrap/Form";
import {Typeahead} from "react-bootstrap-typeahead";

export default class PersonProfileInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: this.props.personTypeList,
            selected: []
        };

        this._input = React.createRef();
    }

    handleOnChangeToParent() {
        if (typeof this.props.onChange === "function") {
            this.props.onChange(this.state.selected);
        }
    }

    handleChange(selected) {
        const toSet = selected.filter(({id}) => {
            return !isNaN(parseInt(id, 10));
        });

        this.setState({
            selected: toSet.map(({id}) => {
                return id
            })
        }, () => {
            this.handleOnChangeToParent();
        });

        const toInclude = selected.filter(({customOption, name}) => {
            return customOption === true && name;
        });

        for (let item of toInclude) {
            fetch(`${API_URL}/book/person_profile/`, {
                method: 'POST',
                body: JSON.stringify({name: item.name}),
                headers: FETCH_HEADERS
            })
                .then(res => res.json())
                .then(result => this.setState({
                    list: [...this.state.list, result],
                    selected: [...this.state.selected, result]
                }, () => {
                    this.handleOnChangeToParent();
                }))
        }
    }

    render() {
        return (
            <Form.Group>
                <Form.Label column="">Pessoa</Form.Label>
                <Typeahead
                    ref={this._input}
                    id={this.props.id}
                    labelKey="name"
                    options={this.state.list}
                    onChange={this.handleChange.bind(this)}
                    defaultSelected={this.props.selected}
                    allowNew
                    newSelectionPrefix="Nova pessoa: "
                    placeholder="Nome da pessoa"
                    emptyLabel="Nenhum registro encontrado"/>
            </Form.Group>
        )
    }
}
