import React from 'react';
import ReactTable from 'react-table';
import _ from "lodash";

class BalanceSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAssetAccounts: [],
      naAssetAccounts: [],
      currentLiabilityAccounts: [],
      naLiabilityAccounts: [],
      equityAccounts: []
    }
  }


  componentDidMount(){
    fetch('/accounts/asset/current')
      .then(res => res.json())
      .then(accounts => this.setState({currentAssetAccounts: accounts}, () => {
        console.log("Current Asset Accounts...", accounts);
      }));

    fetch('/accounts/asset/na')
      .then(res => res.json())
      .then(accounts => this.setState({naAssetAccounts: accounts}, () => {
        console.log("N/A Asset accounts...", accounts);
      }));

    fetch('/accounts/liability/current')
      .then(res => res.json())
      .then(accounts => this.setState({currentLiabilityAccounts: accounts}, () => {
        console.log("Current Liability Accounts...", accounts);
      }));

    fetch('/accounts/liability/na')
      .then(res => res.json())
      .then(accounts => this.setState({naLiabilityAccounts: accounts}, () => {
        console.log("N/A Liability Accounts...", accounts);
      }));

    fetch('/accounts/equity')
      .then(res => res.json())
      .then(accounts => this.setState({equityAccounts: accounts}, () => {
        console.log("Equity Accounts...", accounts);
      }));
  }

  render() {
    return (
      <div className="container">
        <h1>BALANCE SHEET</h1>
        <ReactTable 
          data={this.state.currentAssetAccounts}
          columns={[
            {
              Header: <span><strong>Assets</strong></span>,
              columns: [
                {
                  Header: "Current Assets",
                  id: 'name',
                  accessor: d => <div className="container text-left">{d.name}</div>,
                  Footer: (
                    <span>
                      <strong>Total Current Assets</strong>
                    </span>
                  )
                },
                {
                  Header: '',
                  id: 'amount',
                  accessor: d => {return <div className="container text-right">{(d.debitBalance - d.creditBalance).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</div>},
                  Footer: (
                    <span>
                      {
                        "$" + (_.sumBy(this.state.currentAssetAccounts, d => (d.debitBalance - d.creditBalance))).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
                      }
                    </span>
                  )
                }              
              ]
            }
          ]}
          defaultPageSize={5}
          showPagination={false}
        />

        <ReactTable 
          data={this.state.naAssetAccounts}
          columns={[
            {
                Header: "Property Plant & Equip.",
                id: 'name',
                accessor: d => <div className="container text-left">{d.name}</div>,
                Footer: (
                  <span>
                    <strong>Total Current Assets</strong>
                  </span>
                )
            }
          ]}
          defaultPageSize={5}
          showPagination={false}
        />
      </div>
    )
  }
}

export default BalanceSheet;


function DisplayAssetAmount(props){
  return(
    <div>
      {props.debitBalance - props.creditBalance}
    </div>
  )
}