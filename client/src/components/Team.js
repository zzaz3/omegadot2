import React from 'react';
// Fetch and Auth
import fetch from 'isomorphic-fetch';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import withRouter from 'react-router-dom';

import {withAlert} from 'react-alert';

class Team extends React.Component {
  constructor(props) {
    super(props);

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAlert = this.onAlert.bind(this);

    this.state = {
      members: [],
      firstName: '',
      lastName: ''
    };
  }

  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }

  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }

  async addNewMember(newTeamMember) {
    try {
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newTeamMember)
      });
      const data = await response.json();
      this.setState({
        firstName: '',
        lastName: '',
        members: this.state.members.concat(data)
      });
    } catch (err) {
      // handle error here
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const newTeamMember = {
      firstName: this.state.firstName,
      lastName: this.state.lastName
    }
    this.addNewMember(newTeamMember);
  }

  onAlert(e){
    return this.props.alert.info('ALERT');
  }

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:3000/api/team', {
      });
      const data = await response.json();
      this.setState({ members: data });
    } catch (err) {
      // handle error here
    }
  }

  render() {
    const { members, firstName, lastName } = this.state;

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
              <Button onClick={this.onSubmit.bind(this)}>Submit</Button>
            </Form>
            <Button onClick={this.onAlert}>ALERT</Button>
          </div>
        </div>
        <br />
        <ul className="list-group">
          {members.map(member =>
            <li className="list-group-item" key={member._id}>{member.firstName} {member.lastName}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default withAlert(Team);
