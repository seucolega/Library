import React, {Component} from "react";

export default class PageHeader extends Component {
    render() {
        return (
            <h1 className="mt-4">{this.props.title}</h1>
        )
    }
}
