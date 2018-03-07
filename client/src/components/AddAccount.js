import React from 'react';

class AddAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      selectedAccount: 'none',
      selectedAccountType: 'none',
      isActive: true
    }
  }

  onAccountChange(e) {
    this.setState({ selectedAccount: e.target.value });
  }

  onAccountTypeChange(e) {
    this.setState({ selectedAccountType: e.target.value });
  }

  onActiveChecked(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onChecked(e) {
    this.setState({ checked: e.target.checked });
    console.log(this.state.checked);
  }

  // POST Request For Adding Account To DB
  createAccount(newAccount) {
    fetch('/account/add', {
      method: 'POST',
      body: JSON.stringify(newAccount),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }).then(res => +res.json())
      .catch(err => console.log(`ERROR MESSAGE ${err}`));
  }

  onSubmit(e) {
    e.preventDefault();
    const newAccount = {
      name: this.state.selectedAccount,
      number: this.refs.accountNumber.value,
      category: this.state.selectedAccountType,
      initBalance: this.refs.initBalance.value,
      isActive: this.state.isActive
    }
    this.createAccount(newAccount);
    this.refs.accountNumber.value = '';
    this.refs.initBalance.value = '';
    // console.log(newAccount);
  }

  componentDidMount() {
    // GETs All The Accounts For Populating The Select List
    fetch('/accounts/list')
      .then(res => res.json())
      .then(accounts => this.setState({ accounts: accounts }));
  }

  render() {
    return (
      <div>
        <h1>Create Account</h1>
        <div className="row">
          <form onSubmit={this.onSubmit.bind(this)} className="m-auto">
            <div className="form-group">
              <label htmlFor="accountName">Account Name</label>
              <select onChange={this.onAccountChange.bind(this)} value={this.state.selectedAccount} className="form-control" name="accountName">
                <option value="None" selected>None</option>
                {this.state.accounts.map(account => <option>{account.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="accountNumber">Account Number</label>
              <input type="text" name="accountNumber" ref="accountNumber" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="accountType">Account Type</label>
              <select onChange={this.onAccountTypeChange.bind(this)} value={this.state.selectedAccountType} className="form-control" name="accountType">
                <option value="None" selected>None</option>
                <option value="Asset">Asset</option>
                <option value="Liability">Liability</option>
                <option value="Revenue">Revenue</option>
                <option value="Owner's Equity">Owner's Equity</option>
                <option value="Operating Expense">Operating Expense</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="initialBalance">Initial Balance</label>
              <input type="text" ref="initBalance" className="form-control" />
            </div>
            <div className="form-group">
              <input type="checkbox" checked={this.state.isActive} onChange={this.onActiveChecked.bind(this)} name="isActive" className="form-check-input" />
              <label htmlFor="isActive" className="form-check-label">Active</label>
            </div>
            <input type="submit" value="Create" className="btn btn-primary" />
            <p>{this.state.selectedAccount}</p>
            <p>{this.state.selectedAccountType}</p>
            <p>{this.state.isActive.toString()}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default AddAccount;
