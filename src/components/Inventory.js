import React, { Component } from "react";
import { withRouter } from "react-router";

import "./Inventory.css";

class Inventory extends Component {
	render() {
		return (
			<div id="dashboard">
				{ this.props.stashes.map(stash => <p key={stash.id}>{stash.identifier.number} {stash.identifier.name2} {stash.userId}</p>)}
			</div>
		)
	}
}

export default withRouter(Inventory);