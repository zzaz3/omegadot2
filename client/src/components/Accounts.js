import React from 'react';
import {BrowserRouter, Link} from 'react-router-dom';
import Routes from '../routes/routes';

class Accounts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        return(
            <div>
                <h1>ACCOUNTS</h1>
                <Link to='/accounts/add'>Create Account</Link>
            </div>
        )
    }
}

export default Accounts;