import APIManager from "../../modules/APIManager";

import React, { Component } from "react";
import { withRouter } from "react-router";
import { Navbar, Nav, NavItem, NavLink, NavbarToggler, Collapse } from "reactstrap";

class NavBar extends Component {
    logout = () => {
        APIManager.logout()
    }
    
    render() {
        return (
            <Navbar expand="md" color="light" light id="nav">
            <Nav navbar>
                <NavItem>
                    <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    Welcome <a href="/profile">{this.props.activeUser.username}</a>
                </NavItem>
				<NavItem>
                    <NavLink href="/stash/new">Add New Stack</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={this.logout}>Logout</NavLink>
                </NavItem>
			</Nav>
            </Navbar>
        )
    }
}

export default withRouter(NavBar)