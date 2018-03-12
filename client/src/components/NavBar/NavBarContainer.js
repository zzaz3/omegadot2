import React, { Component } from 'react';

import AuthNavBar from './AuthNavBar';
import NonAuthNavBar from './NonAuthNavBar';

export default function Nav(props) {

  const { role, isLoggedIn } = props.auth;

  return isLoggedIn ? <AuthNavBar role={role} /> : <NonAuthNavBar />;

};
