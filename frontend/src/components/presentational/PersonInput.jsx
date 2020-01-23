// @flow
import React, {Component} from "react";
import PersonItemInput from "./PersonItemInput";
import Button from "react-bootstrap/Button";
import {API_URL, fetchHeaders} from "../../App";

type Props = {
    bookId: number,
    bookPersonList: Array<number>
};

type State = {
    personProfileList: Array<Object>,
    personTypeList: Array<Object>,
    bookPersonList: Array<Object>,
    loaded: number,
    isLoaded: boolean,
    error: void | Object
}

export default class PersonInput extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            personTypeList: [],
            personProfileList: [],
            bookPersonList: [],
            loaded: 0,
            isLoaded: false,
            error: null,
        };
    }

    incrementLoaded() {
        const loaded = this.state.loaded + 1;
        this.setState({loaded: loaded});
        if (loaded >= 2 + this.props.bookPersonList.length) {
            this.setState({isLoaded: true});
        }
    }

    componentDidMount() {
        fetch(`${API_URL}/book/person_type/`, {
            headers: fetchHeaders()
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        personTypeList: result.results
                    }, () => {
                        this.incrementLoaded();
                    });
                },
                (error) => {
                    this.setState({
                        error: error
                    }, () => {
                        this.incrementLoaded();
                    });
                }
            );

        fetch(`${API_URL}/book/person_profile/`, {
            headers: fetchHeaders()
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        personProfileList: result.results
                    }, () => {
                        this.incrementLoaded();
                    });
                },
                (error) => {
                    this.setState({
                        error: error
                    });
                }
            );

        for (let id of this.props.bookPersonList) {
            fetch(`${API_URL}/book/person/${id}/`, {
            headers: fetchHeaders()
        })
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
                            error: error
                        });
                    }
                )
        }
    }

    handleAdd = () => {
        this.setState({
            bookPersonList: [...this.state.bookPersonList, {
                book: this.props.bookId,
                person: null,
                type: []
            }]
        });
    };

    render() {
        const {error, isLoaded, bookPersonList, personProfileList, personTypeList} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else if (!this.props.bookId) {
            return <div>Oops...</div>;
        } else {
            return (
                <fieldset className="my-4">
                    <div className="d-flex justify-content-between align-content-end">
                        <h2 className="mb-0">Pessoas</h2>
                        <Button variant="primary"
                                className="ml-2"
                                onClick={this.handleAdd}>Incluir</Button>
                    </div>
                    <div className="border rounded my-3">
                        {bookPersonList.map((bookPerson, index) => (
                            <PersonItemInput key={index}
                                             bookPerson={bookPerson}
                                             personProfileList={personProfileList}
                                             personTypeList={personTypeList}/>
                        ))}
                    </div>
                </fieldset>
            )
        }
    }
}