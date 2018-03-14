import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Nav from './components/NavBar/NavBarContainer';
import Log from './components/Log';
import Routes from './routes/Routes';

export default function App(props) {
  const { authentication, progress, log } = props;
  const options = {
    position: 'bottom right',
    timeout: 5000,
    transition: 'scale'
  }

  return (
    <Router>
      <AlertProvider template={AlertTemplate} {...options}>
        <div className="App text-center">
          <Nav auth={authentication} />
          <Routes />
        </div>
      </AlertProvider>
    </Router>
  );
}
