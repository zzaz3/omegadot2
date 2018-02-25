import React from 'react';

class AddAccount extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            accounts: [],
            selected: ''
        }
    }

    debugger;
    onChange(e){
        this.setState({selected: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
    }

    componentDidMount(){
        fetch('/accounts/list')
            .then(res => res.json())
            .then(accounts => this.setState({accounts: accounts}));
    }

    render(){
        return(
            <div>
                <h1>Create Account</h1>
                <div className="row">
                    <form onSubmit={this.onSubmit.bind(this)} className="m-auto">
                        <div className="form-group">
                            <label htmlFor="accountName">Account Name</label>
                            <select onChange={this.onChange.bind(this)} value={this.state.selected} className="form-control" name="accountName">
                                {this.state.accounts.map(account => <option>{account.name}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="accountNumber">Account Number</label>
                            <input type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="accountType">Account Type</label>
                            <input type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="initialBalance">Initial Balance</label>
                            <input type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <input type="checkbox" className="form-check-input"/>
                            <label htmlFor="isActive" className="form-check-label">Active</label>
                        </div>
                        <input type="submit" value="Create" className="btn btn-primary"/>
                        <p>{this.state.selected}</p>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddAccount;