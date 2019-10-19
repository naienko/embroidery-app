import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
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

        if (this.state.username && this.state.password && this.state.email) {
            APIManager.add("users", newUser).then(user => {
            //if it exists, warn and refuse
                if (user.error) {
                    alert(user.error.messages.username[0])
                } else {
                    //if it doesn't exist, create new user and set sessionStorage
                    sessionStorage.setItem("userId", parseInt(user.userId))
                    sessionStorage.setItem("AccessToken", user.id)
                    this.props.setAuth()
                    this.props.history.push("/")
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
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input onChange={this.handleFieldChange} id="username" name="username" placeholder="Username" required autoFocus />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input onChange={this.handleFieldChange} id="password" name="password" type="password" placeholder="Password" required />
                </FormGroup>
                <FormGroup>
                    <Label for="email">E-mail</Label>
                    <Input onChange={this.handleFieldChange} id="email" name="email" type="email" placeholder="E-mail" />
                </FormGroup>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input onChange={this.handleFieldChange} id="name" name="name" type="text" placeholder="the name you want displayed" />
                </FormGroup>
                <FormGroup className="text-right">
                    <Button color="primary" type="submit">Register</Button>
                </FormGroup>
            </Form>
   )
    }
}