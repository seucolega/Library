// @flow
import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import {Typeahead} from "react-bootstrap-typeahead";
import {API_URL, FETCH_HEADERS} from "../container/App";

type Props = {
    id: number,
    personTypeList: Array<Object>,
    selected: Array<Object>,
    onChange?: Function
};

type State = {
    list: Array<Object>,
    selected: Array<number>
};

export default class PersonTypeInput extends Component<Props, State> {
    _input: { current: null | HTMLDivElement };

    constructor(props: Props) {
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

    handleChange(selected: Array<Object>) {
        const toSet = selected.filter(({id}) => {
            return !isNaN(id);
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
            fetch(`${API_URL}/book/person_type/`, {
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
                    placeholder="Participação"
                    emptyLabel="Nenhum registro encontrado"/>
            </Form.Group>
        )
    }
}
