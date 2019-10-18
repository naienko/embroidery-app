import React, { Component } from "react"
import { withRouter } from "react-router";
import UserAccessLayer from "../UserAccessLayer"
import Login from "./Login"
import Register from "./Register";

class IsAuth extends Component {
    render() {
        return (
            <React.Fragment>
                { /* if isAuthenticated is true (passed in from Inventory), jump through UserAccessLayer */ }
                { this.props.isAuthenticated()
                    ? 
                    ( <UserAccessLayer {...this.props} /> )
                    :
                    // if isAuthenticated is false, check where you are
                    ( this.props.location.pathname === "/register"
                        ? 
                        // did we go to /register? show registration
                        ( <Register {...this.props} /> )
                        :
                        // else we want to log in
                        ( <Login {...this.props} /> )
                    )
                }
            </React.Fragment>
        )
    }
};

export default withRouter(IsAuth)