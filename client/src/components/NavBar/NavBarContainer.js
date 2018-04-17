import React, { Component } from 'react';

import AuthNavBar from './AuthNavBar';
import NonAuthNavBar from './NonAuthNavBar';

export default function Nav(props) {

  const { role, isLoggedIn, firstName, lastName } = props.auth;

  return isLoggedIn ? <AuthNavBar role={role} name={firstName + " " + lastName} /> : <NonAuthNavBar />;

};
