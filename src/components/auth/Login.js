import React, { Component } from "react";
import { withRouter } from "react-router";
import Form from "reactstrap/Form";
import Button from "reactstrap/Button";

import APIManager from "../../modules/APIManager";

class Login extends Component {
    //empty state to start with, to store input fields in
    state = {
        username: "",
        password: ""
    }

    // Update state whenever an input field is edited (Steve's code)
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    //event handler for login (cribbed from Jenna's code)
    handleLogin = event => {
        //stop the form doing HTML stuff
        event.preventDefault()
        //using the loopback login endpoint
        if (this.state.username && this.state.password) {
            const loginObject = {}
            loginObject.username = this.state.username
            loginObject.password = this.state.password
            APIManager.login(loginObject).then(
                user => {
                    //store the input data in sessionStorage (like a cookie)
                    sessionStorage.setItem("userId", parseInt(user[0].userId))
                    sessionStorage.setItem("AccessToken", user[0].id)
                    this.props.setAuth()
                }
            )
        } else {
            //if the user didn't fill all fields, warn
            alert("Please Fill Out Form!")
        }
    }

    render() {
        return (
            <React.Fragment>
                <Form onSubmit={this.handleLogin} className="m-sm-3">
                    <h1>Please sign in</h1>
                    <Form.Group controlId="username">
                        <Form.Label>
                            Username
                        </Form.Label>
                        <Form.Control onChange={this.handleFieldChange} placeholder="username or email" required autoFocus />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control onChange={this.handleFieldChange} type="password" placeholder="password" required />
                    </Form.Group>
                    <Form.Group className="text-right">
                        <Button variant="primary" type="submit">Sign in</Button>
                    </Form.Group>
                </Form>
                <div className="text-center">
                    Not a member yet? <Button variant="secondary" onClick={() => this.props.history.push("/register")}>Register</Button>
                </div>
            </React.Fragment>
        )
    }
};

export default withRouter(Login);