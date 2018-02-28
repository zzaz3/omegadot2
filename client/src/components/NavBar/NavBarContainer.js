import React, { Component } from 'react';

import AuthNavBar from './AuthNavBar';
import NonAuthNavBar from './NonAuthNavBar';

export default function Nav(props) {
  const { isLoggedIn } = props.auth;

  return isLoggedIn ? <AuthNavBar /> : <NonAuthNavBar />;
};
