import React, {Component} from "react";
import Form from "react-bootstrap/Form";
// import OptionEmpty from "./OptionEmpty.jsx";

export default class TextualClassificationInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            list: []
        };
    }

    componentDidMount() {
        fetch("/api/book/textual_classification/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        list: result.results
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, list} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Form.Group controlId="form_textual_classification">
                    <Form.Label column="">Classificação textual</Form.Label>
                    <Form.Control name="textual_classification" defaultValue={this.props.value} as="select" multiple>
                        {/*<OptionEmpty/>*/}
                        {list.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
            );
        }
    }
}