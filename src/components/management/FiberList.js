import React, { Component } from "react";
import { withRouter } from "react-router";

import { Card, CardBody, CardTitle, CardText } from "reactstrap";

class FiberList extends Component {
	render() {
		return(
			this.props.stashes.map(stash => 
				<Card>
					<CardBody>
						<CardTitle>
							{stash.howMany} {stash.partialHank} {/* if partialHank === true ? "+" : "" */}
						</CardTitle>
						<CardText>
							{stash.identifier.number} {stash.identifier.name2}<br />
							{stash.company.name} {stash.type.name}
							{/* list notes, projects in single fiber page  */}
						</CardText>
					</CardBody>
				</Card>
			)
		)
	}
}

export default withRouter(FiberList);