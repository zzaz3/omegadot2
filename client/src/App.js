import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Nav from './components/NavBar/NavBarContainer';
import Routes from './routes/routes';

export default function App(props) {
  const { authentication, progress } = props;


  return (
    <Router>
      <div className="App text-center">
        <Nav auth={authentication} />
        <Routes />
      </div>
    </Router>
  );
}
