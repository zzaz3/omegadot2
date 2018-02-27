import React from 'react';
import {NavLink, Link} from 'react-router-dom';

class NonAuthNavBar extends React.Component{

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-link">Home</NavLink>
                        </li>
                    </ul>
                    <Link to="/login" className="btn btn-primary mr-2" role="button">Login</Link>
                </div>
            </nav>
        )
    }
}

export default NonAuthNavBar;