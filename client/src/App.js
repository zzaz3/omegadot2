import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';

import Home from './components/Home';
import Team from './components/Team';
import Nav from './components/NavBar/NavBarContainer';
import Routes from './routes/routes';

const config = {
  issuer: 'https://dev-922121.oktapreview.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oae55r8vlZx9rf4t0h7'
}

class App extends Component {
  render() {
    return (
      <Router>
        <Security issuer={config.issuer}
                  client_id={config.client_id}
                  redirect_uri={config.redirect_uri}
        >
          < Nav />
          < Routes />
        </Security>
      </Router>
    );
  }
}

export default App;
