import React, { Component } from "react";
import { Form } from "reactstrap";
import { Button } from "reactstrap";

import APIManager from "../../modules/APIManager";

export default class Register extends Component {

    //empty state to start with, to store input fields in
    state = {
        email: "",
        password: "",
        username: "",
        name: ""
    }

    // Update state whenever an input field is edited (Steve's code)
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    //event handler for registration (cribbed from Jenna's code)
    handleRegister = event => {
        //stop the form doing HTML stuff
        event.preventDefault()

        //create an object using the data pulled from the form fields
        const newUser = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            name: this.state.name
        }
        //compare this object to data from the users table in db
        if (this.state.username && this.state.password) {
            APIManager.getQuery(`username=${this.state.username}`, "users").then(users => {
            //if it exists, warn and refuse
                if (users.length) {
                    alert(`Username ${this.state.username} already exists!`)
                } else {
            //if it doesn't exist, create new user and set sessionStorage
                    APIManager.add("users", newUser).then(user => {
                        sessionStorage.setItem("credentials", parseInt(user.id))
                        this.props.setAuth()
                        this.props.history.push("/")
                    })
                }
            })
        } else {
            //if the user didn't fill all fields, warn
            alert("Please Fill Out Form!")
        }
      }


    render() {
        return (
            <Form onSubmit={this.handleRegister} className="m-sm-3">
                <h1>Please register</h1>
                <Form.Group controlId="username">
                    <Form.Label>
                        Username
                    </Form.Label>
                    <Form.Control onChange={this.handleFieldChange} placeholder="Username" required autoFocus />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control onChange={this.handleFieldChange} type="password" placeholder="Password" required />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>
                        E-mail
                    </Form.Label>
                    <Form.Control onChange={this.handleFieldChange} type="email" placeholder="E-mail" />
                </Form.Group>
                <Form.Group controlId="display_name">
                    <Form.Label>
                        Display Name
                    </Form.Label>
                    <Form.Control onChange={this.handleFieldChange} type="text" placeholder="the name you want displayed" />
                </Form.Group>
                <Form.Group className="text-right">
                    <Button variant="primary" type="submit">Register</Button>
                </Form.Group>
            </Form>
        )
    }
}