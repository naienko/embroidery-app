import React, { Component } from "react";
import { withRouter } from "react-router";

import CompanyList from "./CompanyList";

class MasterList extends Component {
	//map method wants a function call so here's the function
	FilterLoop = (currentStash, company) => {
		//this eliminates display of fibers you don't have any of and filters by company id
		if (currentStash.length > 0) {
			return <CompanyList stashes={currentStash} company={company} />
		}
	}

	render() {
		return (
			<div id="dashboard">
				<ul>
				{
					//map all the stashes passed in and create an array of stashes using that company
					this.props.stashes.map(c => {
						let currentStash = this.props.stashes.filter(stash => stash.identifier.companyId === c.id)
						let company = c.identifier.company
						//call the function because map method is picky
						return this.FilterLoop(currentStash, company)
					})
				}
				</ul>
			</div>
		)
	}

}

export default withRouter(MasterList);