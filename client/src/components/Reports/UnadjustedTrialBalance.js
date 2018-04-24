import React from 'react';
import ReactTable from 'react-table';

class UnadjustedTrialBalance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      accounts: []
    }

    this.getCredits = this.getCredits.bind(this);
  }

  getCredits(){
    // for(let i = 0; i < accounts.length; i++){

    // }
  }

  componentDidMount(){
    fetch('/transactions/reg')
      .then(res => res.json())
      .then(transactions => this.setState({transactions: transactions}, () => console.log("Fetched transactions...", transactions)));

    fetch('/accounts')
      .then(res => res.json())
      .then(accounts => this.setState({accounts: accounts}, () => console.log("Fetched accounts...", accounts)));
  }

  render() {
    return (
      <div className="container">
        <h1>UNADJUSTED TRIAL BALANCE</h1>
        <ReactTable 
          data={this.state.transactions}
          columns={[
            {
              Header: 'Date',
              accessor: 'date'
            },
            {
              Header: 'Status',
              accessor: 'status'
            }
          ]}
        />
      </div>
    )
  }
}

export default UnadjustedTrialBalance;
