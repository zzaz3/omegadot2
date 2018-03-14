import React from 'react';
// Fetch and Auth
import fetch from 'isomorphic-fetch';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import withRouter from 'react-router-dom';

import {withAlert} from 'react-alert';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      role: ''
    };
  }

  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }

  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleRoleChange(e) {
    this.setState({ role: e.target.value });
  }

  async addNewUser(newUser) {
    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        credentials: 'same-origin',
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newUser)
      });
      const data = await response.json();
      // TODO: Log thing here.
    } catch (err) {
      this.props.alert.info('ERROR');
      // handle error here
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      role: this.state.role
    }
    this.addNewUser(newUser);
  }

  render() {
    const { firstName, lastName, username, email, password, role } = this.state;

    return (
      <div>
        <div className="row justify-content-center">
          <div className="col-10 col-sm-7 col-md-5 col-lg-4">
            <Form>
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="first name"
                  value={firstName}
                  onChange={this.handleFirstNameChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input
                  type="lastname"
                  name="lastname"
                  id="lastname"
                  placeholder="last name"
                  value={lastName}
                  onChange={this.handleLastNameChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email"
                  value={email}
                  onChange={this.handleEmailChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  type="username"
                  name="username"
                  id="username"
                  placeholder="username"
                  value={username}
                  onChange={this.handleUsernameChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  value={password}
                  onChange={this.handlePasswordChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="role">Role</Label>
                <Input
                  type="role"
                  name="role"
                  id="role"
                  placeholder="role"
                  value={role}
                  onChange={this.handleRoleChange}
                />
              </FormGroup>
              <Button onClick={this.onSubmit.bind(this)}>Create Account</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert(Register);
