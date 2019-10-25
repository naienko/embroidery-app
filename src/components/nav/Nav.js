import APIManager from "../../modules/APIManager";

import React, { Component } from "react";
import { withRouter } from "react-router";
import { Navbar, Nav, NavItem, NavLink, NavbarToggler, Collapse } from "reactstrap";

class NavBar extends Component {
	state ={
		collapse: false
	}

    logout = () => {
		APIManager.logout();
		localStorage.clear();
		sessionStorage.clear();
	}
	
	toggle = () => this.setState({collapse: !this.state.collapse});
	
    render() {
        return (
			<Navbar light expand="md" color="white" className="sticky-top border-bottom border-dark">
				<Nav pills fill className="w-100">
					<NavItem className="m-1 border rounded border-light">
						<NavLink href="/">Home</NavLink>
					</NavItem>
					<NavItem className="m-1 pt-2 border rounded border-light">
						Welcome{ window.matchMedia('screen and (max-width: 768px)').matches ? <br /> : " " }<a href="/profile">{this.props.activeUser.username}</a>
					</NavItem>
					<NavItem className="m-1 border rounded border-light">
						<NavLink href="/stash/new">Add New</NavLink>
					</NavItem>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.collapse} navbar>
						<NavItem className="m-1 border rounded border-light">
							<NavLink onClick={this.logout}>Logout</NavLink>
						</NavItem>
					</Collapse>
				</Nav>
			</Navbar>
        )
    }
}

export default withRouter(NavBar)