import React from "react";
import Page from "./Page.jsx";
import PageHeader from "../presentational/PageHeader.jsx";

export default class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    // componentDidMount() {
    //     fetch('http://jsonplaceholder.typicode.com/users')
    //         .then(res => res.json())
    //         .then((data) => {
    //             this.setState({...{boo_list: data}})
    //         })
    //         .catch(console.log)
    // }

    render() {
        return (
            <div>
                {/*<Page title="Book"/>*/}
                <PageHeader title="Livros"/>
            </div>
        )
    }
}
