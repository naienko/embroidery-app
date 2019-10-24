import React, { Component } from "react";
import { withRouter } from "react-router";

import Select from "react-select";

import { Form, FormGroup, Label, Input, Button } from "reactstrap";

class AddNew extends Component {
	//set empty local state
	state = {
		companyId: "",
		typeId: "",
		fiberId: "",
		inUse: 1,
		howMany: 1,
		partialHank: 0,
		projectNotes: "",
		otherNotes: ""
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
			userId: sessionStorage.getItem("userId") || localStorage.getItem("userId"),
		}

		//if the form is filled out
		if (this.state.fiberId) {
			//construct the object using data in local state
			stash.identifierId = parseInt(this.state.fiberId.value);
			//add object to db
			// TODO: create POST function
			this.props.addStash(stash)
				.then(
					//change this to occur when user clicks ok?
					// TODO: allow user to choose if they want toast or clickable alert?
					setTimeout(() => {
						this.props.history.push("/")
					}, 3500)
				)
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
			let filteredFibers = this.props.identifiers.filter(element => {
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
		} else {
			let fiberList = this.props.identifiers;
			fiberList.sort(compareValues('number')).map(element => 
				fiberOptions.push({value: element.id, label: `${element.number} ${element.name2} (${element.company.name} ${element.type.name})`})
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
					<FormGroup>
						<Label for="howMany">How many skeins?</Label>
						<Input type="number" onChange={this.handleFieldChange} />
					</FormGroup>
					<FormGroup tag="fieldset">
						<p>Do you have part of a skein?</p>
						<FormGroup check inline>
							<Label check>
								<Input type="radio" name="partialHank" id="1" />{' '}yes
							</Label>
						</FormGroup>
						<FormGroup check inline>
							<Label check>
								<Input type="radio" name="partialHank" id="0" />{' '}no
							</Label>
						</FormGroup>
					</FormGroup>
					<FormGroup tag="fieldset">
						<p>Are you using this fiber in a project now?</p>
						<FormGroup check inline>
							<Label check>
								<Input type="radio" name="inUse" id="1" />{' '}yes
							</Label>
						</FormGroup>
						<FormGroup check inline>
							<Label check>
								<Input type="radio" name="inUse" id="0" />{' '}no
							</Label>
						</FormGroup>
					</FormGroup>
					<FormGroup>
						<Label for="projectNotes">Notes on that project?</Label>
						<Input type="textarea" name="projectNotes" id="projectNotes" onChange={this.handleFieldChange} />
					</FormGroup>
					<FormGroup>
						<Label for="otherNotes">Any other notes?</Label>
						<Input type="textarea" name="otherNotes" id="otherNotes" onChange={this.handleFieldChange} />
					</FormGroup>
					<Button color="success" type="submit">Submit</Button>
				</Form>
			</div>
		)
	}
}

export default withRouter(AddNew)