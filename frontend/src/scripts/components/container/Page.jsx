import React from "react";
import PageHeader from "../presentational/PageHeader.jsx";

export default class Page extends React.Component {
    render() {
        return (
            <div>
                <PageHeader title={this.props.title}/>
                {this.props.content}
            </div>
        )
    }
}
