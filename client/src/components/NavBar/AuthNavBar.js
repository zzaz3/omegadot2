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
    return (
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/accounts" className="nav-link">Accounts</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/journalize" className="nav-link">Journalize</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/post" className="nav-link">Post</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/balance" className="nav-link">Balance</NavLink>
            </li>
          </ul>

          <Link to="/" onClick={this.tryLogout} className="btn btn-primary mr-2" role="button">Logout</Link>
          <Link to="/team" className="btn btn-success" role="button">Team</Link>
          { this.props.role == "admin" &&
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
