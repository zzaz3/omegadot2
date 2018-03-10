import React from 'react';

class AddAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      selectedAccount: 'none',
      accountNumber: '',
      accountType: '',
      accountSubType: '',
      isActive: true
    }
  }

  onAccountChange(e) {
    this.setState({ selectedAccount: e.target.value });
    const accounts = this.state.accounts;
    accounts.forEach(account => {
      if(account.name == e.target.value){
        this.setState({
          accountNumber: account.number,
          accountType: account.type,
          accountSubType: account.subtype
        });
        console.log(`${account.name} ${account.number} ${account.type}`);
      }
    });
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
    }).then(res => res.json())
      .catch(err => console.log(`ERROR MESSAGE ${err}`));
  }

  onSubmit(e) {
    e.preventDefault();
    if(Math.sign(this.refs.initBalance.value) === -1) {
      console.log('NEGATIVE BALANCE!');
      return;
    } else {
      const newAccount = {
        name: this.state.selectedAccount,
        number: this.state.accountNumber,
        type: this.state.accountType,
        subtype: this.state.accountSubType,
        initBalance: this.refs.initBalance.value,
        isActive: this.state.isActive
      }
      this.createAccount(newAccount);
      this.setState({
        selectedAccount: 'none',
        accountNumber: '',
        accountType: '',
        accountSubType: ''
      });
    }
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
              <input type="text" name="accountNumber" ref="accountNumber" className="form-control" value={this.state.accountNumber} disabled/>
            </div>
            <div className="form-group">
              <label htmlFor="accountType">Account Type</label>
              <input type="text" name="accountType" className="form-control" value={this.state.accountType} disabled/>
            </div>
            <div>
              <label htmlFor="accountSubType">Account Sub-Type</label>
              <input type="text" name="accountSubType" className="form-control" value={this.state.accountSubType} disabled/>
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
            <p>
              {this.state.selectedAccount}
              {this.state.accountNumber}
              {this.state.accountType}
              {this.state.accountSubType}
              {this.state.isActive}
            </p>
          </form>
        </div>
      </div>
    )
  }
}

export default AddAccount;
