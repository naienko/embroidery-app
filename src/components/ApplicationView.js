import React, {Component} from "react";
import { Route } from "react-router-dom";

import APIManager from "../modules/APIManager";
import Inventory from "./Inventory";
import AddNew from "./AddNew";
import Login from "./auth/Login";


export default class ApplicationView extends Component {
	//empty state to fill while components render
	state = {
		companies: [],
		identifiers: [],
		types: [],
		stash: [],
		shoppinglist: [],
		stitchers: []
	}

	//check if the components rendered, then do this
	componentDidMount() {
		try {
			APIManager.getAll("companies")
				.then(companies => this.setState({companies: companies}))
		} catch(err) {
			alert(err)
		}

		try {
			APIManager.getWithDetails("identifiers")
				.then(identifiers => this.setState({identifiers: identifiers}))
		} catch (err) {
			alert(err)
		}

		try {
			APIManager.getAll("types")
				.then(types => this.setState({types: types}))
		} catch (err) {
			alert(err)
		}

		try {
			APIManager.getByUserId("shoppinglists")
			.then(shoppinglists => this.setState({shoppinglists: shoppinglists}))
		} catch (err) {
			alert(err)
		}
		
		try {
			APIManager.getAll("stitchers")
				.then(stitchers => this.setState({stitchers: stitchers}))
		} catch (err) {
			alert(err)
		}
		
		try {
			APIManager.getByUserId("stashes")
				.then(stashes => this.setState({stashes: stashes}))
		} catch (err) {
			alert(err)
		}
		}
		
		//POST/PUT/PATCH/DELETE here for props to components
		addStash = newStash => {
			return APIManager.add("stashes", newStash)
				.then(() => APIManager.getByUserId("stashes"))
				.then(stashes => this.setState({ stashes: stashes }))
		}
		
		render() {
			return (
			//routes go here
			<React.Fragment>
				<Route exact path="/login" component={Login} />

				<Route exact path="/" render={(props) => {
					return <Inventory 
						companies={this.state.companies} 
						identifiers={this.state.identifiers} 
						stitchers={this.state.stitchers}
					/>
				}} />

				<Route path="/stash/new" render={(props) => {
					return <AddNew 
						companies={this.state.companies} 
						identifiers={this.state.identifiers} 
						types={this.state.types}
						addStash={this.addStash}
					/>
				}} />
			</React.Fragment>
		)
	}
}