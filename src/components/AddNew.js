import React, { Component } from "react";
import { withRouter } from "react-router";

import Select from "react-select";

import { Form, FormGroup, Label } from "reactstrap";
//import Button from "reactstrap";

class AddNew extends Component {
	//set empty local state
	state = {
		companyId: "",
		typeId: "",
		fiberId: ""
	}

	// Update state whenever an input field is edited (Steve's code)
	handleFieldChange = event => {
		const stateToChange = {}
		stateToChange[event.target.id] = event.target.value
		this.setState(stateToChange);
	}

	handleCompanyChange = companyId => {
		this.setState({companyId});
	}
	handleTypeChange = typeId => {
		this.setState({typeId});
	}
	handleFiberChange = fiberId => {
		this.setState({fiberId})
	}

	createNewStash = event => {
		//stop the form doing HTML stuff
		event.preventDefault()
		//construct the stash object
		const stash = {
			userId: sessionStorage.getItem("userId") || localStorage.getItem("userId")
		}


	}

	render() {
		let companyOptions = [];
		this.props.companies.map(element =>
			companyOptions.push({value: element.id, label: element.name})
			);
		const { companyId } = this.state;
		
		let typeOptions = [];
		this.props.types.map(element =>
			typeOptions.push({value: element.id, label: element.name})
			);
		const { typeId } = this.state;
		
// function for dynamic sorting
// from https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
	function compareValues(key, order='asc') {
		return function(a, b) {
	  		if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
				// property doesn't exist on either object
			return 0;
	  		}
  
		  	const varA = (typeof a[key] === 'string') ?
				a[key].toUpperCase() : a[key];
	  		const varB = (typeof b[key] === 'string') ?
				b[key].toUpperCase() : b[key];

		  	let comparison = 0;
		  	if (varA > varB) {
				comparison = 1;
	  		} else if (varA < varB) {
				comparison = -1;
		  	}
	  		return (
				(order === 'desc') ? (comparison * -1) : comparison
		  	);
		};
  	}

		let fiberOptions = [];
		if (typeId && companyId) {
			let filteredFibers = this.props.fibers.filter(element => {
				let isCompany = false;
				if (element.companyId === companyId.value) {
					isCompany = true;
				}
				return isCompany;
			})
			let filteredFibers2 = filteredFibers.filter(element => {
				let isType = false;
				if (element.typeId === typeId.value) {
					isType = true;
				}
				return isType;
			})
			filteredFibers2.sort(compareValues('number')).map(element => 
				fiberOptions.push({value: element.id, label: `${element.number} ${element.name2}`})
				);
		}
		const { fiberId } = this.state;
				
		return(
			<div id="dashboard">
				<Form onSubmit={this.createNewStash}>
					<FormGroup>
						<Label for="companyId">Company</Label>
						<Select value={companyId} onChange={this.handleCompanyChange} options={companyOptions} />
					</FormGroup>
					<FormGroup>
						<Label for="typeId">Type of Fiber</Label>
						<Select value={typeId} onChange={this.handleTypeChange} options={typeOptions} />
					</FormGroup>
					<FormGroup>
						<Label for="fiberId">Identifier</Label>
						<Select value={fiberId} onChange={this.handleFiberChange} options={fiberOptions} />
					</FormGroup>
				</Form>
			</div>
		)
	}
}

export default withRouter(AddNew)