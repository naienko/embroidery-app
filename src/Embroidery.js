import React, { Component } from "react";
import IsAuth from "./components/auth/IsAuth";

export default class Embroidery extends Component {
    // a function that return true if the Storage object contains the key and false if it does not.
    isAuthenticated = () => sessionStorage.getItem("userId") !== null || localStorage.getItem("userId") !== null

    //set default local state
    state = {
        authTrigger: this.isAuthenticated()
    }

    // a function that can be passed down to a component to trigger a render.
    setAuth = () => {
        //when state is changed re-rendering happens
        this.setState({ authTrigger: this.isAuthenticated() })
    }

    render() {
        return (
            <React.Fragment>
                <IsAuth isAuthenticated={this.isAuthenticated} setAuth={this.setAuth} />
            </React.Fragment>
        )
    }
}