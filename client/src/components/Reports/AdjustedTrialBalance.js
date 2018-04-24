import React from 'react';
import ReactTable from 'react-table';
import _ from "lodash";

class AdjustedTrialBalance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: []
    }

    this.formatAccountsData = this.formatAccountsData.bind(this);
    this.showAccountData = this.showAccountData.bind(this);
  }

  formatAccountsData(){
    let accountsData = []
    let accounts = this.state.accounts;

    for(let i = 0; i < accounts.length; i++){
      let tempDebitBalance = 0;
      let tempCreditBalance = 0;
      if(accounts[i].debitBalance > accounts[i].creditBalance){
        tempDebitBalance = accounts[i].debitBalance - accounts[i].creditBalance;
      } else if(accounts[i].creditBalance > accounts[i].debitBalance){
        tempCreditBalance = accounts[i].creditBalance - accounts[i].debitBalance;
      }

      accountsData.push({
        name: accounts[i].name,
        normalSide: accounts[i].normalSide,
        debitBalance: tempDebitBalance,
        creditBalance: tempCreditBalance
      });
    }

    return accountsData;
  }

  showAccountData(e){
    e.preventDefault();

    let data = this.formatAccountsData();
    console.log(data);
    return data;
  }

  componentDidMount(){
    fetch('/accounts')
      .then(res => res.json())
      .then(accounts => this.setState({accounts: accounts}, () => {
        console.log("Fetched accounts...", accounts)
        accounts.forEach(account => {
          console.log(`${account.name}: BALANCE = ${account.debitBalance - account.creditBalance}`);
        });
      }));
  }

  render() {
    const data = this.formatAccountsData();

    return (
      <div className="container">
        <h3 className="row text-center">
          <div className="col-md-12">
            NormalSide Accounting Inc.
          </div>
          <div className="col-md-12">
            Adjusted Trial Balance 
          </div>
          <div className="col-md-12">
            For the Year Ended December 31st, 2018
          </div>
        </h3>
        <ReactTable 
          data={data}
          columns={[
            {
              Header: 'Accounts',
              accessor: 'name'
            },
            {
              Header: 'Debit',
              id: 'debit',
              accessor: d => <DisplayDebits normalSide={d.normalSide} debitBalance={d.debitBalance} creditBalance={d.creditBalance}/>,
              Footer: (
                <span style={{ "border-bottom": "3px double" }}>
                      <strong >Total:</strong>{" "}
                      {
                        "$" + (_.sumBy(data, d => d.debitBalance)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
                      }
                </span>
              )
            },
            {
              Header: 'Credit',
              id: 'credit',
              accessor: d => <DisplayCredits normalSide={d.normalSide} debitBalance={d.debitBalance} creditBalance={d.creditBalance}/>,
              Footer: (
                <span style={{ "border-bottom": "3px double" }}>
                      <strong>Total:</strong>{" "}
                      {
                        "$" + (_.sumBy(data, d => d.creditBalance)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
                      }
                </span>
              )
            }
          ]}
        />
      </div>
    )
  }
}

export default AdjustedTrialBalance;

function DisplayDebits(props){
  return(
    <div>
      <div>
        {
          props.normalSide == "debit" ? <div className="text-right">{(props.debitBalance - props.creditBalance).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</div> : <div className="text-center">-</div>
        }
      </div>
    </div>
  )
}

function DisplayCredits(props){
  return(
    <div>
      <div>
        {
          props.normalSide == "credit" ? <div className="text-right">{(props.creditBalance - props.debitBalance).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</div> : <div className="text-center">-</div>
        }
      </div>
    </div>
  )
}


