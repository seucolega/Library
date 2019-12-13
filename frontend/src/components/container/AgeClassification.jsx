import React, {Component} from "react";
import AgeClassificationList from "./AgeClassificationList";
import AgeClassificationItem from "./AgeClassificationItem";
import AgeClassificationItemNew from "./AgeClassificationItemNew";

export default class AgeClassification extends Component {
    render() {
        const id = this.props.match.params.id;
        if (id === 'new') {
            return <AgeClassificationItemNew/>
        } else if (id > 0) {
            return <AgeClassificationItem id={id}/>
        } else {
            return <AgeClassificationList/>
        }
    }
}