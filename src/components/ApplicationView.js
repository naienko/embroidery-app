import React, {Component} from "react";
import { Route } from "react-router-dom";

import APIManager from "../modules/APIManager";
import Inventory from "./Inventory";


export default class ApplicationView extends Component {
	//empty state to fill while components render
	state = {
		companies: []
	}

	//check if the components rendered, then do this
	componentDidMount() {
		const newState = {};

		//learn how to make these promises run concurrently and non-dependently?
		APIManager.getAll("companies")
			.then(companies => newState.companies = companies)
			//fill state -- this setup requires that all the datafetching promises run first
			//fill state when each datagetting promise returns, instead of all at once?
			.then(() => this.setState(newState))
			//rerendering happens here
	}

	//POST/PUT/PATCH/DELETE here for props to components

	render() {
		return (
			//routes go here
			<Route exact path="/" render={(props) => {
				return <Inventory 
					companies={this.state.companies}
				/>
			}}
			/>
		)
	}
}