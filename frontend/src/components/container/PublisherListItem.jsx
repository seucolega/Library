import React, {Component} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import {Link} from "react-router-dom";

export default class PublisherListItem extends Component {
    render() {
        const item = this.props.item;
        return (
            <ListGroup.Item className="d-sm-flex justify-content-sm-between">
                <div>
                    <p className="m-0"><strong>{item.name}</strong></p>
                </div>
                <div className="pt-2 pb-1 py-sm-0 pl-sm-3">
                    <Link to={`/publisher/${item.id}/`} className="btn btn-xs btn-info">Editar</Link>
                </div>
            </ListGroup.Item>
        )
    }
}
