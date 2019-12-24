// @flow
import React, {Component} from "react";
import TextualClassificationList from "./TextualClassificationList";
import TextualClassificationItem from "./TextualClassificationItem";
import TextualClassificationItemNew from "./TextualClassificationItemNew";

type Props = {
    match: Object
}

export default class TextualClassification extends Component<Props> {
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