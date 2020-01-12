// @flow
import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import {Typeahead} from "react-bootstrap-typeahead";
import {API_URL, fetchHeaders} from "../../App";

type Props = {
    selected: Array<number>,
    onChange: Function,
};

type State = {
    list: Array<Object>,
    selected: Array<Object>,
    isLoaded: boolean,
    error: void | Object
};

export default class AgeClassificationInput extends Component<Props, State> {
    _input: { current: null | React$ElementRef<React$ElementType> };

    constructor(props: Props) {
        super(props);

        this.state = {
            list: [],
            selected: [],
            isLoaded: false,
            error: null
        };

        this._input = React.createRef();
    }

    componentDidMount() {
        fetch(`${API_URL}/book/age_classification/`, {
            headers: fetchHeaders()
        })
            .then(res => res.json())
            .then(
                (result) => {
                    const list = result.results;
                    const selected = list.filter(({id}) => {
                        return this.props.selected.includes(id)
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
            selected = selected.map(({id}) => {
                return id
            });

            this.props.onChange(selected);
        }
    }

    handleChange(selected: Array<Object>) {
        const toSet = selected.filter(({id}) => {
            return !isNaN(parseInt(id, 10));
        });

        this.setState({
            selected: toSet
        }, () => {
            this.handleOnChangeToParent();
        });

        const toInclude = selected.filter(({customOption, name}) => {
            return customOption === true && name;
        });

        for (let item of toInclude) {
            fetch(`${API_URL}/book/age_classification/`, {
                method: 'POST',
                body: JSON.stringify({name: item.name}),
                headers: fetchHeaders()
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
        const {error, isLoaded, list} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Form.Group controlId="age_classification">
                    <Form.Label column="">Classificação etária</Form.Label>
                    <Typeahead
                        ref={this._input}
                        id="age_classification"
                        labelKey="name"
                        options={list}
                        onChange={this.handleChange.bind(this)}
                        defaultSelected={this.state.selected}
                        multiple
                        allowNew
                        newSelectionPrefix="Nova classificação: "
                        placeholder="Nome da classificação"
                        emptyLabel="Nenhum registro encontrado"/>
                </Form.Group>
            )
        }
    }
}