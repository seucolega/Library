import React from "react";

export default class PageHeader extends React.Component {
    render() {
        return (
            <h1 className="mt-4">{this.props.title}</h1>
        )
    }
}
