import APIManager from "../modules/APIManager";
import React, { Component } from "react"

import NavBar from "./nav/Nav";
import ApplicationView from "./ApplicationView";

export default class UserAccessLayer extends Component {
	//set default local state
	state = {
		activeUser: {}
	}

	//store the logged in user's id in a variable
    activeUserId = () => parseInt(sessionStorage.getItem("userId")) || parseInt(localStorage.getItem("userId"));

    componentDidMount() {
        //get that user's whole object and put it in local state
        APIManager.getOne(this.activeUserId(), "stitchers")
            .then(activeUser =>
                this.setState({ activeUser: activeUser })
            )
    }

	render() {
		return (
			<React.Fragment>
			<NavBar setAuth={this.props.setAuth} activeUser={this.state.activeUser} />
			
			<ApplicationView activeUserId={this.activeUserId} activeUser={this.state.activeUser} />
		</React.Fragment>
		)
	}
}