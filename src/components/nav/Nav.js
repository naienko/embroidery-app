import APIManager from "../../modules/APIManager";

import React, { Component } from "react";
import { withRouter } from "react-router";
import { Navbar, Nav, NavItem, NavLink, NavbarToggler, Collapse, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";

class NavBar extends Component {
	state ={
		collapse: false
	}

    logout = () => {
		APIManager.logout();
		localStorage.clear();
		sessionStorage.clear();
		this.props.history.push("/");
	}
	
	toggle = () => this.setState({collapse: !this.state.collapse});
	
    render() {
        return (
			<Navbar light expand="md" color="white" className="sticky-top border-bottom border-dark">
				<Nav pills fill className="w-100">
					<UncontrolledDropdown nav>
						<DropdownToggle nav caret>
							Home
						</DropdownToggle>
						<DropdownMenu>
							<DropdownItem>
								Welcome{ window.matchMedia('screen and (max-width: 768px)').matches ? <br /> : " " }<a href="/profile">{this.props.activeUser.username}</a>
							</DropdownItem>
							<DropdownItem>
								<NavLink href="#" onClick={this.logout}>Logout</NavLink>
							</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>
						<UncontrolledDropdown nav>
							<DropdownToggle nav caret>
								Manage Threads
							</DropdownToggle>
							<DropdownMenu>
								<DropdownItem>
									<NavLink href="/threads/list">List All</NavLink>
								</DropdownItem>
								<DropdownItem>
									<NavLink href="/threads/new">Add New</NavLink>
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.collapse} navbar>
						<UncontrolledDropdown nav>
							<DropdownToggle nav caret>
								Manage Projects
							</DropdownToggle>
							<DropdownMenu>
								<DropdownItem>
									List All
								</DropdownItem>
								<DropdownItem>
									<NavLink href="#">Add New</NavLink>
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Collapse>
				</Nav>
			</Navbar>
        )
    }
}

export default withRouter(NavBar)