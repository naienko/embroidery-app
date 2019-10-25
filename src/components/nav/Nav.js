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
			<Navbar light expand="md" color="light" className="sticky-top">
				<Nav pills fill className="w-100">
					<NavItem className="m-1">
						<NavLink href="/" active>Home</NavLink>
					</NavItem>
					<NavItem className="m-1 pt-2">
						Welcome <a href="/profile">{this.props.activeUser.username}</a>
					</NavItem>
					<NavItem className="m-1">
						<NavLink href="/stash/new">Add New Stash</NavLink>
					</NavItem>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.collapse}>
						<NavItem className="m-1">
							<NavLink onClick={this.logout}>Logout</NavLink>
						</NavItem>
					</Collapse>
				</Nav>
			</Navbar>
        )
    }
}

export default withRouter(NavBar)