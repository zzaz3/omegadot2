import React from 'react';
// import withRouter from 'react-router-dom';

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: []
    };
  }

  
  addNewMember(newTeamMember){
    fetch('http://localhost:3000/api/team', {
      method: 'POST',
      body: JSON.stringify(newTeamMember),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }).then(res => res.json())
    .catch(err => console.log(`ERROR MESSAGE ${err}`));
  }

  onSubmit(e){
    e.preventDefault();
    const newTeamMember = {
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value
    }
    this.addNewMember(newTeamMember);
    this.setState({
      members: this.state.members.concat(newTeamMember)
    });
    // this.props.history.push('/');
  }

  componentDidMount() {
    fetch('/api/team')
      .then(res => res.json())
      .then(members => this.setState({members: members}, () => console.log('Customers fetched...', members)));
  }

  render() {
    return (
      <div>
        <h1>SOFTWARE TEAM</h1>
        <div>
          <form onSubmit={this.onSubmit.bind(this)}>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" name="firstName" ref="firstName"/>
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" name="lastName" ref="lastName"/>
            <input type="submit" value="Join"/>
          </form>
        </div>
        <ul className="list-group">
        {this.state.members.map(member => 
          <li className="list-group-item" key={member.id}>{member.firstName} {member.lastName}</li>
        )}
        </ul>
      </div>
    );  
  }
}

export default Team;
