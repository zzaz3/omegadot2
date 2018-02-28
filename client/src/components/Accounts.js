// Test Pull
import React from 'react';
import { Link } from 'react-router-dom';
import 'react-bootstrap';


class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: []
    }
  }

  getAccountStatus(account) {
    if (account.isActive)
      return 'active';
    else
      return 'inactive';
  }

  componentDidMount() {
    fetch('/accounts')
      .then(res => res.json())
      .then(accounts => this.setState({ accounts: accounts }, () => console.log('Accounts fetched...', accounts)));
  }

  render() {
    return (
      <div className="container text-left mt-5">
        <h2>ACCOUNTS</h2>
        <Link to='/accounts/add'>
          <button className="btn btn-primary mb-4">Create Account</button>
        </Link>
        <table className="table table-striped">
          <thead>
            {/* Number, Name, Balance, Type, Status*/}
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Balance</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.accounts.map(account =>
              <tr>
                <td>{account.number}</td>
                <td>{account.name}</td>
                <td>{account.balance}</td>
                <td>{account.category}</td>
                <td>{this.getAccountStatus(account)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Accounts;
