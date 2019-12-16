import React, {Component} from "react";
import {API_URL} from "../container/App";
import PersonItemInput from "./PersonItemInput";

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

        // this._input = React.createRef();
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
                            // let person_profile_list = this.state.person_profile_list;
                            // person_profile_list.splice(person_profile_list.findIndex(item => item.id === result.person), 1, item);
                            //
                            // this.setState({person_profile_list: person_profile_list});
                            //
                            // if (this.state.book_person_list.length >= this.props.value.length) {
                            //     this._input.current.setState({selected: this.state.book_person_list});
                            // }

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

    // handleChange(selected) {
    //     this.setState({selected}, () => {
    //         this.props.onChange();
    //     });
    //
    //     console.log(selected);
    // }
    //
    render() {
        const {error, isLoaded, bookPersonList, personProfileList, personTypeList} = this.state;

        // this.addEventToTokens();

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            // return (
            //     <div>
            //         <Form.Group controlId="person">
            //             <Form.Label column="">Pessoas</Form.Label>
            //             <Typeahead
            //                 ref={this._input}
            //                 id="person"
            //                 labelKey="name"
            //                 options={person_profile_list}
            //                 onChange={this.handleChange.bind(this)}
            //                 multiple
            //                 allowNew
            //                 newSelectionPrefix="Nova pessoa: "
            //                 placeholder="Pessoa"
            //             />
            //         </Form.Group>
            //     </div>
            // )
            return (
                <div>
                    {bookPersonList.map((bookPerson, index) => (
                        <div key={index}>
                            <p>ID: {bookPerson.id}</p>
                            <PersonItemInput bookPerson={bookPerson}
                                             personProfileList={personProfileList}
                                             personTypeList={personTypeList}/>

                            {/*<div key={index}>*/}
                            {/*    <Form.Group controlId={`bookPerson-${index}`}>*/}
                            {/*        <Form.Label column="">Pessoa</Form.Label>*/}
                            {/*        <Typeahead*/}
                            {/*            id={`bookPerson-${index}`}*/}
                            {/*            labelKey="name"*/}
                            {/*            options={person_profile_list}*/}
                            {/*            // onChange={this.handleChange}*/}
                            {/*            defaultSelected={person_profile_list.filter(({id}) => {*/}
                            {/*                return id === person*/}
                            {/*            })}*/}
                            {/*            allowNew*/}
                            {/*            newSelectionPrefix="Nova pessoa: "*/}
                            {/*            placeholder="Nome da pessoa"/>*/}
                            {/*    </Form.Group>*/}
                            {/*    <Form.Group controlId={`bookPersonType-${index}`}>*/}
                            {/*        <Form.Label column="">Participação</Form.Label>*/}
                            {/*        <Typeahead*/}
                            {/*            id={`bookPersonType-${index}`}*/}
                            {/*            labelKey="name"*/}
                            {/*            options={person_type_list}*/}
                            {/*            // onChange={this.handleChange}*/}
                            {/*            defaultSelected={person_type_list.filter(({id}) => {*/}
                            {/*                return type.includes(id)*/}
                            {/*            })}*/}
                            {/*            allowNew*/}
                            {/*            newSelectionPrefix="Nova participação: "*/}
                            {/*            placeholder="Participação"/>*/}
                            {/*    </Form.Group>*/}
                            {/*</div>*/}
                        </div>
                    ))}
                </div>
            )
        }
    }
}