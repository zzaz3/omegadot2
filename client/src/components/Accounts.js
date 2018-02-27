import React from 'react';
import { Link} from 'react-router-dom';

class Accounts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        return(
            <div className="container text-left mt-5">
                <h2>ACCOUNTS</h2>
                <Link to='/accounts/add'>
                    <button className="btn btn-primary mb-4">Create Account</button>
                </Link>
                <table className="table table-striped">
                    <thead>
                        {/* Number, Name, Balance, Type, Status*/}
                        <tr>
                            <th>Number</th>
                            <th>Name</th>
                            <th>Balance</th>
                            <th>Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>101</td>
                            <td>Cash</td>
                            <td>$421,000</td>
                            <td>Asset</td>
                            <td>active</td>
                        </tr>
                        <tr>
                            <td>401</td>
                            <td>Sales</td>
                            <td>$112,000</td>
                            <td>Revenue</td>
                            <td>active</td>
                        </tr>
                        <tr>
                            <td>201</td>
                            <td>Notes Payable</td>
                            <td>$97,000</td>
                            <td>Liability</td>
                            <td>inactive</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Accounts;