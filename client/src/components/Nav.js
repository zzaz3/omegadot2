import React from 'react';
import {NavLink, Link} from 'react-router-dom';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/accounts" className="nav-link">Accounts</NavLink>
                        </li>
                        <li className="nav-item"> 
                            <NavLink to="/journalize" className="nav-link">Journalize</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/post" className="nav-link">Post</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/balance" className="nav-link">Balance</NavLink>
                        </li>
                    </ul>

                    <Link to="/signup" className="btn btn-primary mr-2" role="button">Sign Up</Link>
                    <Link to="/team" className="btn btn-success" role="button">Team</Link>

                    
                </div>
            </nav>
        )
    }
}

export default Navigation;