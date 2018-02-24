import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../components/Home';
import Accounts from '../components/Accounts';
import AddAccount from '../components/AddAccount'
import Journalize from '../components/Journalize'
import Post from '../components/Post';
import Balance from '../components/Balance';
import SignUp from '../components/SignUp';
import Team from '../components/Team';

function Routes(){
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/accounts" component={Accounts} />
            <Route exact path="/accounts/add" component={AddAccount} />
            <Route exact path="/journalize" component={Journalize} />
            <Route exact path="/post" component={Post} />
            <Route exact path="/balance" component={Balance} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/team" component={Team} />
        </Switch>
    )
}

export default Routes;