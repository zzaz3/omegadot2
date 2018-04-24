import React from 'react';
import ReactTable from 'react-table';
import _ from "lodash";

class BalanceSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allAssetAccounts: [],
      currentAssetAccounts: [],
      naAssetAccounts: [],
      allLiabilityAccounts: [],
      currentLiabilityAccounts: [],
      naLiabilityAccounts: [],
      equityAccounts: []
    }
  }


  componentDidMount(){
    fetch('/accounts/asset')
    .then(res => res.json())
    .then(accounts => this.setState({allAssetAccounts: accounts}, () => {
      console.log("All Asset Accounts...", accounts);
    }));

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

    fetch('/accounts/liability')
      .then(res => res.json())
      .then(accounts => this.setState({allLiabilityAccounts: accounts}, () => {
        console.log("All Liability Accounts...", accounts);
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
      <h3 className="row text-center">
          <div className="col-md-12">
            NormalSide Accounting Inc.
          </div>
          <div className="col-md-12">
            Balance Sheet
          </div>
          <div className="col-md-12">
            At April 30, 2018
          </div>
        </h3>
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
                  <strong>Property Plant & Equip., Net</strong>
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
                    "$" + (_.sumBy(this.state.naAssetAccounts, d => (d.debitBalance - d.creditBalance))).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
                  }
                </span>                
              )
            }
          ]}
          defaultPageSize={2}
          showPagination={false}
        />

        <ReactTable 
          data={this.state.allAssetAccounts}
          columns={[
            {
              Footer: (
                <span>
                  <strong>Total Assets</strong>
                </span>
              )
            },
            {
              Footer: (
                <span style={{ "border-bottom": "3px double" }}>
                  {
                    "$" + (_.sumBy(this.state.allAssetAccounts, d => (d.debitBalance - d.creditBalance))).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
                  }
                </span>                
              )
            }
          ]}
          defaultPageSize={2}
          showPagination={false}
        />
        {/* LIABILTIES */}
        <ReactTable 
          data={this.state.currentLiabilityAccounts}
          columns={[
            {
              Header: <span><strong>Liabilities & Stakeholder's Equity</strong></span>,
              columns: [
                {
                  Header: "Current Liabilities",
                  id: 'name',
                  accessor: d => <div className="container text-left">{d.name}</div>,
                  Footer: (
                    <span>
                      <strong>Total Current Liabilities</strong>
                    </span>
                  )
                },
                {
                  Header: '',
                  id: 'amount',
                  accessor: d => {return <div className="container text-right">{(d.creditBalance - d.debitBalance).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</div>},
                  Footer: (
                    <span>
                      {
                        "$" + (_.sumBy(this.state.currentLiabilityAccounts, d => (d.creditBalance - d.debitBalance))).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
                      }
                    </span>
                  )
                }              
              ]
            }
          ]}
          defaultPageSize={2}
          showPagination={false}
        />

        <ReactTable 
          data={this.state.naLiabilityAccounts}
          columns={[
            {
              Header: '',
              id: 'name',
              accessor: d => <div className="container text-left">{d.name}</div>
            },
            {
              Header: '',
              id: 'amount',
              accessor: d => {return <div className="container text-right">{(d.creditBalance - d.debitBalance).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</div>},
            }
          ]}
          defaultPageSize={1}
          showPagination={false}
        />

        <ReactTable 
          data={this.state.allLiabilityAccounts}
          columns={[
            {
              Footer: (
                <span>
                  <strong>Total Liabilities</strong>
                </span>
              )
            },
            {
              Footer: (
                <span style={{ "border-bottom": "3px double" }}>
                  {
                    "$" + (_.sumBy(this.state.allLiabilityAccounts, d => (d.creditBalance - d.debitBalance))).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
                  }
                </span>                
              )
            }
          ]}
          defaultPageSize={2}
          showPagination={false}
        />

        <ReactTable 
          data={this.state.equityAccounts}
          columns={[
            {
              Header: "Stockholder's Equity",
              id: 'equity',
              accessor: d => <div className="container text-left">{d.name}</div>,
              Footer: (
                <span>
                  <strong>Total Liabilities</strong>
                </span>
              )
            },
            {
              Header: '',
              id: 'amount',
              accessor: d => {return <div className="container text-right">{(d.creditBalance - d.debitBalance).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</div>},
              Footer: (
                <span style={{ "border-bottom": "3px double" }}>
                  {
                    "$" + (_.sumBy(this.state.equityAccounts, d => (d.creditBalance - d.debitBalance))).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
                  }
                </span>                
              )
            }
          ]}
          defaultPageSize={2}
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