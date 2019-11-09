import React, { Component } from "react";
import { withRouter } from "react-router";

import { UncontrolledCollapse, Badge } from "reactstrap";

class FiberList extends Component {
	render() {
		return(
			<React.Fragment>
				<li className="list-group-item" id={"toggle-type" + this.props.type.id}>{this.props.type.name} <Badge pill>{this.props.stashes.length}</Badge></li>
				<UncontrolledCollapse toggler={"#toggle-type" + this.props.type.id}>
				<ul className="row-striped">
					{this.props.stashes.map(stash => console.log(stash))}
					{
						this.props.stashes.map(stash => <li key={stash.id} className="list-group-item">{stash.identifier.number} {stash.identifier.name2} <Badge pill color="info">{stash.howMany}{ stash.partialHank ? "+" : "" }</Badge> </li>)
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