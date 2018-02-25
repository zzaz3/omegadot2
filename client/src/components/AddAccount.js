import React from 'react';

class AddAccount extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            accounts: []
        }
    }

    componentDidMount(){
        // debugger;
    }

    render(){
        return(
            <div>
                <h1>Create Account</h1>
                <form className="form-group">
                    <select name="accountName">
                        {/* {this.state.accounts.map(account => <option>account.name</option>)} */}
                        <option value="test">Test</option>
                    </select>
                    <input type="submit" value="Create"/>
                </form>
            </div>
        )
    }
}

export default AddAccount;