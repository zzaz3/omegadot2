import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logoutSuccess, logoutFailure } from '../../actions/auth';

class AuthNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.tryLogout = this.tryLogout.bind(this);
  }

  async tryLogout() {
    const {
      logoutSuccessAction,
      logoutFailureAction
    } = this.props;

    try {
      const response = await fetch('/auth/logout', {
        method: 'GET',
        headers: new Headers({
          "Content-Type": "application/json",
        })
      });
      const data = await response.json();
      logoutSuccessAction();
      // TODO: Log thing here.
    } catch (err) {
      logoutFailureAction();
      // handle error here
    }
  }

  render() {
    const {name, role} = this.props;
    return (
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink exact to="/charts" className="nav-link">Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/accounts" className="nav-link">Accounts</NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink to="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Journalize</NavLink>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavLink to="/transactions/view" className="dropdown-item">View Transactions</NavLink>
                <NavLink to="/transactions/record" className="dropdown-item">Record Transactions</NavLink>
                <NavLink to="/transactions/review" className="dropdown-item">Review Transactions</NavLink>
              </div>
            </li>
            <li className="nav-item dropdown">
              <NavLink to="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Reports</NavLink>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavLink to="/reports/unadjustedtrialbalance" className="dropdown-item">Unadjusted Trial Balance</NavLink>
                <NavLink to="/reports/adjustedtrialbalance" className="dropdown-item">Adjusted Trial Balance</NavLink>
                <NavLink to="/reports/closingtrialbalance" className="dropdown-item">Closing Trial Balance</NavLink>
                <NavLink to="/reports/incomestatement" className="dropdown-item">Income Statement</NavLink>
                <NavLink to="/reports/retainedearnings" className="dropdown-item">Retained Earnings</NavLink>
                <NavLink to="/reports/balancesheet" className="dropdown-item">Balance Sheet</NavLink>
              </div>
            </li>
            <li className="nav-item">
              <NavLink to="/log" className="nav-link">Log</NavLink>
            </li>
          </ul>
          { name &&
            <div>
              <p>Welcome, {name}! </p>
            </div>
          }
          <Link to="/" onClick={this.tryLogout} className="btn btn-primary mr-2" role="button">Logout</Link>
          { role == "admin" &&
            <Link to="/register" className="btn btn-success" role="button">Register</Link>
          }

        </div>
      </nav>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logoutSuccessAction: logoutSuccess,
    logoutFailureAction: logoutFailure,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(AuthNavBar);
