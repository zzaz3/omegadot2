import React from 'react';

class AddAccount extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            accounts: []
        }
    }

    componentDidMount(){

    }

    render(){
        return(
            <div>
                <h1>Create Account</h1>
                <form className="form-group">
                    <select name="accountName">
                        <option value="cash">Cash</option>
                        <option value="revenue">Revenue</option>
                        <option value="drawings">Drawings</option>
                    </select>
                    <input type="submit" value="Create"/>
                </form>
            </div>
        )
    }
}

export default AddAccount;