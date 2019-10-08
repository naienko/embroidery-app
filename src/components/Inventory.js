import React, { Component } from "react";
import { withRouter } from "react-router";

class Inventory extends Component {
	render() {
		return (
			<div id="dashboard">
				{ this.props.companies.map(company => <p>{company.name}</p>)}
			</div>
		)
	}
}

export default withRouter(Inventory);