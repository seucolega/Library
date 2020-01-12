// @flow
import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import {Typeahead} from "react-bootstrap-typeahead";
import {API_URL, fetchHeaders} from "../../App";

type Props = {
    id: number,
    personTypeList: Array<Object>,
    selected: Array<number>,
    onChange: Function
};

type State = {
    list: Array<Object>,
    selected: Array<Object>
};

export default class PersonTypeInput extends Component<Props, State> {
    _input: { current: null | React$ElementRef<React$ElementType> };

    constructor(props: Props) {
        super(props);

        const list = this.props.personTypeList;

        this.state = {
            list: list,
            selected: list.filter(({id}) => {
                return this.props.selected.includes(id)
            })
        };

        this._input = React.createRef();
    }

    handleOnChangeToParent() {
        if (typeof this.props.onChange === "function") {
            let selected = this.state.selected.filter(({id}) => {
                return !isNaN(id);
            });
            selected = selected.map(({id}) => {
                return id
            });

            this.props.onChange(selected);
        }
    }

    handleChange(selected: Array<Object>) {
        this.setState({
            selected: selected
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
                headers: fetchHeaders
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
        const controlId = `person_type_${this.props.id}`;

        return (
            <Form.Group controlId={controlId}>
                <Form.Label column="">Participação</Form.Label>
                <Typeahead
                    ref={this._input}
                    id={controlId}
                    labelKey="name"
                    options={this.state.list}
                    onChange={this.handleChange.bind(this)}
                    defaultSelected={this.state.selected}
                    multiple
                    allowNew
                    newSelectionPrefix="Nova participação: "
                    placeholder="Participação"
                    emptyLabel="Nenhum registro encontrado"/>
            </Form.Group>
        )
    }
}
