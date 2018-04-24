import React from 'react';
import 'whatwg-fetch';
import { Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { incrementProgress, decrementProgress } from '../../actions/progress';
import { loginAttempt, loginSuccess, loginFailure } from '../../actions/auth';

import Login from './Login';

export class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.attemptLogIn = this.attemptLogIn.bind(this);

    this.state = {
      redirect: false,
    };
  }

  async attemptLogIn(userData) {
    const {
      decrementProgressAction,
      incrementProgressAction,
      loginAttemptAction,
      loginFailureAction,
      loginSuccessAction,
    } = this.props;

    incrementProgressAction();
    loginAttemptAction();

    await fetch(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      },
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((json) => {
      if (json) {
        loginSuccessAction(json);
        this.setState({ redirect: true });
      } else {
        loginFailureAction(new Error('Authentication Failed'));
      }
    })
    .catch((error) => {
      loginFailureAction(new Error(error));
    });

    decrementProgressAction();
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return (
        <Redirect to="/charts" />
      );
    }

    return (
      <div>
        <Login loginFunction={this.attemptLogIn} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    incrementProgressAction: incrementProgress,
    decrementProgressAction: decrementProgress,
    loginAttemptAction: loginAttempt,
    loginFailureAction: loginFailure,
    loginSuccessAction: loginSuccess,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginContainer);
