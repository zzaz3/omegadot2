import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Nav from './components/Nav';
import Routes from './routes/routes';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App text-center">
          <Nav />
          <Routes />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
