import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

import AuthNavBar from './AuthNavBar';
import NonAuthNavBar from './NonAuthNavBar';

export default withAuth(class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = { authenticated: null };
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.checkAuthentication();
      }
    
      async checkAuthentication() {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
          this.setState({ authenticated });
        }
      }
    
      componentDidUpdate() {
        this.checkAuthentication();
      }


    render() {
        return this.state.authenticated ? <AuthNavBar />:<NonAuthNavBar />;
    }
});