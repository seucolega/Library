import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import {Typeahead} from "react-bootstrap-typeahead";
import {API_URL, FETCH_HEADERS} from "../container/App";

export default class PersonTypeInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: this.props.personTypeList,
            selected: []
        };

        this._input = React.createRef();
    }

    handleChange(selected) {
        const toInclude = selected.filter(({customOption, name}) => {
            return customOption === true && name;
        });

        for (let item of toInclude) {
            fetch(`${API_URL}/book/person_type/`, {
                method: 'POST',
                body: JSON.stringify({name: item.name}),
                headers: FETCH_HEADERS
            })
                .then(res => res.json())
                .then(result => this.setState({
                    list: [...this.state.list, result],
                    selected: [...this.state.selected, result]
                }))
        }
    }

    render() {
        return (
            <Form.Group>
                <Form.Label column="">Participação</Form.Label>
                <Typeahead
                    ref={this._input}
                    id={this.props.id}
                    labelKey="name"
                    options={this.state.list}
                    onChange={this.handleChange.bind(this)}
                    defaultSelected={this.props.selected}
                    multiple
                    allowNew
                    newSelectionPrefix="Nova participação: "
                    placeholder="Participação"/>
            </Form.Group>
        )
    }
}
