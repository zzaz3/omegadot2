import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.compileFormData = this.compileFormData.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {
      username: '',
      password: '',
    };
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  compileFormData() {
    const { loginFunction } = this.props;
    const formData = this.state;
    loginFunction(formData);
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-10 col-sm-7 col-md-5 col-lg-4">
          <Form>
            <FormGroup>
              <Label for="exampleUsername">Username</Label>
              <Input
                type="Username"
                name="Username"
                id="exampleUsername"
                placeholder="username"
                value={this.state.username}
                onChange={this.handleUsernameChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </FormGroup>
            <Button onClick={this.compileFormData}>Log In</Button>
          </Form>
        </div>
      </div>
    );
  }
}
