import React, {Component} from "react";
import {API_URL} from "../container/App";
import PersonItemInput from "./PersonItemInput";
import Button from "react-bootstrap/Button";

export default class PersonInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            loaded: 0,
            isLoaded: false,
            personTypeList: [],
            personProfileList: [],
            bookPersonList: []
        };
    }

    incrementLoaded() {
        const loaded = this.state.loaded + 1;
        this.setState({loaded: loaded});
        if (loaded >= 2 + this.props.value.length) {
            this.setState({isLoaded: true});
        }
    }

    componentDidMount() {
        fetch(`${API_URL}/book/person_type/`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        // isLoaded: true,
                        personTypeList: result.results
                    }, () => {
                        this.incrementLoaded();
                    });
                },
                (error) => {
                    this.setState({
                        // isLoaded: true,
                        error
                    });
                }
            );

        fetch(`${API_URL}/book/person_profile/`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        // isLoaded: true,
                        personProfileList: result.results
                    }, () => {
                        this.incrementLoaded();
                    });
                },
                (error) => {
                    this.setState({
                        // isLoaded: true,
                        error
                    });
                }
            );

        for (let id of this.props.value) {
            fetch(`${API_URL}/book/person/${id}/`)
                .then(res => res.json())
                .then(
                    (result) => {
                        const item = {...result, id: id};
                        this.setState({
                            bookPersonList: [...this.state.bookPersonList, item],
                        }, () => {
                            this.incrementLoaded();
                        });
                    },
                    (error) => {
                        this.setState({
                            // isLoaded: true,
                            error
                        });
                    }
                )
        }
    }

    handleRemove(idToRemove) {
        this.setState({
            bookPersonList: this.state.bookPersonList.filter(({id}) => {
                return id !== idToRemove
            })
        });
    }

    handleAdd() {
        this.setState({
            bookPersonList: [...this.state.bookPersonList, {
                book: this.props.bookId,
                person: null,
                type: []
            }]
        });
    }

    render() {
        const {error, isLoaded, bookPersonList, personProfileList, personTypeList} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <fieldset className="my-4">
                    <div className="d-flex justify-content-between align-content-end">
                        <h2 className="mb-0">Pessoas</h2>
                        <Button variant="primary"
                                className="ml-2"
                                onClick={this.handleAdd.bind(this)}>Incluir</Button>
                    </div>
                    <div className="border rounded my-3">
                        {bookPersonList.map((bookPerson, index) => (
                            <div key={index} className={`pt-3 pb-4 px-3 ${index > 0 ? 'border-top' : ''}`}>
                                <PersonItemInput bookPerson={bookPerson}
                                                 personProfileList={personProfileList}
                                                 personTypeList={personTypeList}
                                                 onRemove={this.handleRemove.bind(this)}/>
                            </div>
                        ))}
                    </div>
                </fieldset>
            )
        }
    }
}