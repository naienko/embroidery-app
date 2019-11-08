import React, { Component } from "react";
import { withRouter } from "react-router";

import { UncontrolledCollapse } from "reactstrap";

import FiberList from "./FiberList";

class CompanyList extends Component {
	//map method wants a function call so here's the function
	FilterLoop = (currentStash, type) => {
		//this eliminates display of fibers you don't have any of and filters by type id
		if (currentStash.length > 0) {
			return <FiberList stashes={currentStash} type={type} />
		}
	}

	render() {
		return(
			<React.Fragment>
				<li class="list-group-item" id={"toggle-company" + this.props.company.id}>{this.props.company.name}</li>
				<UncontrolledCollapse toggler={"#toggle-company" + this.props.company.id}>
					<ul>
					{
						//map all the stashes passed in and create an array of stashes using that company
						this.props.stashes.map(c => {
							let currentStash = this.props.stashes.filter(stash => stash.identifier.typeId === c.id)
							let type = c.identifier.type
							//call the function because map method is picky
							return this.FilterLoop(currentStash, type)
						})
					}
					</ul>
				</UncontrolledCollapse>
			</React.Fragment>
		)
	}
}

export default withRouter(CompanyList);