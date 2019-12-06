import React, {Component} from "react";
import cookie from "react-cookies";

export default class CSRFToken extends Component {
    render() {
        return (
            <input type="hidden" value={cookie.load("csrftoken")} name="csrfmiddlewaretoken"/>
        )
    }
}
