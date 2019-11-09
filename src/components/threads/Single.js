import React, { Component } from "react";

import { Card, CardBody, CardTitle, CardSubtitle, CardText, Row, Col } from "reactstrap";

export default class SingleFiber extends Component {
	render() {
		const thread = this.props.stashes.find(element => element.id === parseInt(this.props.match.params.stashId)) || {};
		
		return (			
			<Row>
				<Col sm={{ size: 4, offset: 4}}>
				{thread.identifier &&	<Card outline color="info">
					<CardBody>
						<CardTitle className="text-center">{thread.identifier.company.name} {thread.identifier.type.name}</CardTitle>
						<CardSubtitle className="text-center">{thread.identifier.number} {thread.identifier.name2}</CardSubtitle>
					</CardBody>
					<CardBody>
						<CardText>project list goes here</CardText>
						<hr />
						<CardText>{thread.other_notes}</CardText>
					</CardBody>
				</Card> }
				</Col>
			</Row>			
		)
	}
}

// withRouter(SingleFiber);