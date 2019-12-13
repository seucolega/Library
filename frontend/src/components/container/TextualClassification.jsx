import React, {Component} from "react";
import TextualClassificationList from "./TextualClassificationList";
import TextualClassificationItem from "./TextualClassificationItem";
import TextualClassificationItemNew from "./TextualClassificationItemNew";

export default class TextualClassification extends Component {
    render() {
        const id = this.props.match.params.id;
        if (id === 'new') {
            return <TextualClassificationItemNew/>
        } else if (id > 0) {
            return <TextualClassificationItem id={id}/>
        } else {
            return <TextualClassificationList/>
        }
    }
}