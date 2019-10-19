import React, { Component } from "react";
import { withRouter } from "react-router";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { Button } from "reactstrap";

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
                    sessionStorage.setItem("userId", parseInt(user.userId))
                    sessionStorage.setItem("AccessToken", user.id)
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
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input onChange={this.handleFieldChange} name="username" id="username" placeholder="username or email" required autoFocus />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input onChange={this.handleFieldChange} name="password" id="password" type="password" placeholder="password" required />
                    </FormGroup>
                    <FormGroup className="text-right">
                        <Button color="primary" type="submit">Sign in</Button>
                    </FormGroup>
                </Form>
                <div className="text-center">
                    Not a member yet? <Button color="secondary" onClick={() => this.props.history.push("/register")}>Register</Button>
                </div>
            </React.Fragment>
        )
    }
};

export default withRouter(Login);