import React, { Component } from "react";
import { withRouter } from "react-router";

import { UncontrolledCollapse } from "reactstrap";

class FiberList extends Component {
	render() {
		return(
			<React.Fragment>
				<li class="list-group-item" id={"toggle-type" + this.props.type.id}>{this.props.type.name}</li>
				<UncontrolledCollapse toggler={"#toggle-type" + this.props.type.id}>
				<ul>
					{
						this.props.stashes.map(stash => <li key={stash.id} class="list-group-item">{stash.identifier.number} {stash.identifier.name2} {stash.howMany}{ stash.partialHank === true ? "+" : "" } </li>)
					}
					<li>loop through list of stashes per user -- filtered here by company, then fiber type<br />
					i.e. this is a group of all the dmc 6 strand embroidery threads user owns</li>
				</ul>
				</UncontrolledCollapse>
			</React.Fragment>
		)
	}
}

export default withRouter(FiberList);