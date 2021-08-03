// @flow
import React, {Component} from "react";
import AgeClassificationList from "./AgeClassificationList";
import AgeClassificationItem from "./AgeClassificationItem";
import AgeClassificationItemNew from "./AgeClassificationItemNew";

type Props = {
    match: Object
}

export default class AgeClassification extends Component<Props> {
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