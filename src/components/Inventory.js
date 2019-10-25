import React, { Component } from "react";
import { withRouter } from "react-router";

class Inventory extends Component {
	render() {
		return (
			<div id="dashboard">
				{ this.props.companies.map(company => <p key={company.id}>{company.name}</p>)}
				<hr />
				{ this.props.identifiers.map(identifier => <p key={identifier.id}>{identifier.number}</p>)}
			</div>
		)
	}
}

export default withRouter(Inventory);