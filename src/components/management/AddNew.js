import React, { Component } from "react";
import { withRouter } from "react-router";

import Select, { createFilter } from "react-select";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddNew extends Component {
	//set empty local state
	state = {
		companyId: "",
		typeId: "",
		fiberId: "",
		howMany: 1,
		partialHank: false,
		otherNotes: ""
	}

	// Update state whenever an input field is edited (Steve's code)
	handleFieldChange = event => {
		const stateToChange = {}
		stateToChange[event.target.id] = event.target.value
		this.setState(stateToChange);
	}

	handleCheckbox = event => {
        if (event.target.checked) {
            this.setState({target: true});
        } else {
            this.setState({target: false});
        }
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
			userId: parseInt(sessionStorage.getItem("userId")) || parseInt(localStorage.getItem("userId"))
		}

		//if the form is filled out
		if (this.state.fiberId) {
			//construct the object using data in local state
			stash.identifierId = parseInt(this.state.fiberId.value);
			if (this.state.howMany < 0) {
				alert("Hey, you can't have a negative amount! If you want to remove skeins from a stash, please use the update button on the home screen.")
			} else {
				stash.howMany = parseInt(this.state.howMany);
			}
			stash.partialHank = this.state.partialHank;
			stash.otherNotes = this.state.otherNotes;

			//add object to db
			console.log(stash)
			this.props.addStash(stash)
			.then(
// TODO: allow user to choose if they want toast or clickable alert?
				toast.success("New fiber added!",{
					toastId: 'success',
					onClose: () => 
						this.props.history.push("/")
				})
			)
		} else {
			alert("Please select a fiber!")
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
		const stringify = option => option.label;
		const filterOption = createFilter({ ignoreCase: false, stringify });
		const { fiberId } = this.state;

		return(
			<div id="dashboard">
				<ToastContainer autoClose={false} closeOnClick position="top-center" />
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
						<Select value={fiberId} onChange={this.handleFiberChange} options={fiberOptions} filterOption={filterOption} />
					</FormGroup>
					<FormGroup>
						<Label for="howMany">How many skeins?</Label>
						<Input type="number" id="howMany" value={this.state.howMany} onChange={this.handleFieldChange} />
					</FormGroup>
					<FormGroup check inline>
					Do you have part of a skein?&nbsp;&nbsp;
						<Label check>
						<Input type="checkbox" name="partialHank" id="partialHank" onClick={this.handleCheckbox} />yes
						</Label>
					</FormGroup>
					<div>
						display list of project this fiber is associated with here
					</div>
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

export default withRouter(AddNew);