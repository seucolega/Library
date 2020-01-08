// @flow
import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import {Typeahead} from "react-bootstrap-typeahead";
import {API_URL, FETCH_HEADERS} from "../container/App";

type Props = {
    value: number,
    onChange: Function
};

type State = {
    list: Array<Object>,
    selected: Array<Object>,
    isLoaded: boolean,
    error: void | Object
};

export default class PublisherInput extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            list: [],
            selected: [],
            isLoaded: false,
            error: null
        };
    }

    componentDidMount() {
        fetch(`${API_URL}/book/publisher/`, {
            headers: FETCH_HEADERS
        })
            .then(res => res.json())
            .then(
                (result) => {
                    const list = result.results;
                    const selected = list.filter((item) => {
                        return this.props.value === item.id
                    });
                    this.setState({
                        list: list,
                        selected: selected,
                        isLoaded: true,
                        error: false
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                }
            )
    }

    handleOnChangeToParent() {
        if (typeof this.props.onChange === "function") {
            let selected = this.state.selected.filter(({id}) => {
                return !isNaN(id);
            });
            if (typeof selected[0] != 'undefined' && selected[0].id) {
                selected = selected[0].id;
            } else {
                selected = null;
            }

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
            fetch(`${API_URL}/book/publisher/`, {
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
        const {error, isLoaded, list, selected} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Form.Group controlId="publisher">
                    <Form.Label column="">Editora</Form.Label>
                    <Typeahead
                        id="publisher"
                        labelKey="name"
                        options={list}
                        onChange={this.handleChange.bind(this)}
                        defaultSelected={selected}
                        allowNew
                        newSelectionPrefix="Nova editora: "
                        placeholder="Nome da editora"
                        emptyLabel="Nenhum registro encontrado"/>
                </Form.Group>
            )
        }
    }
}