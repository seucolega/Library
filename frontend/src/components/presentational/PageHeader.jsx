// @flow
import React, {Component} from "react";

type Props = {
    title: string,
    buttons?: React$Element<React$ElementType>
}

export default class PageHeader extends Component<Props> {
    render() {
        return (
            <div className="mb-4 d-sm-flex justify-content-sm-between align-items-sm-end">
                <h1 className="mb-0">{this.props.title}</h1>
                <div className="mb-1 pt-2 pb-1 py-sm-0 pl-sm-3">
                    {this.props.buttons}
                </div>
            </div>
        )
    }
}
