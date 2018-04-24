import React from 'react';
import ReactTable from 'react-table';
import _ from "lodash";

class IncomeStatement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      revenue: [],
      expenseAccounts: []
    }

    this.formatAccountData = this.formatAccountData.bind(this);
    this.calculateTotalExpenses = this.calculateTotalExpenses.bind(this);
  }

  formatAccountData(){
    let accountsData = [];
    let revenue = this.state.revenue;
    accountsData.push({
      account: revenue.name,
      amount: revenue.creditBalance,
      type: revenue.type
    });

    let expenses = this.state.expenseAccounts;
    for(let i = 0; i < expenses.length; i++){
      accountsData.push({
        account: expenses[i].name,
        amount: expenses[i].debitBalance,
        type: expenses[i].type
      });
    }

    return accountsData;
  }

  calculateTotalExpenses(){
    let expenses = this.state.expenseAccounts;
    let total = 0;
    for(let i = 0; i < expenses.length; i++){
      total += expenses[i].debitBalance;
    }

    return total;
  }

  componentDidMount(){
    fetch('/account/servicerevenue')
      .then(res => res.json())
      .then(account => this.setState({revenue: account}, () => {
        console.log("Service Revenue...", account);
      }));

    fetch('/accounts/expense')
      .then(res => res.json())
      .then(accounts => this.setState({expenseAccounts: accounts}, () => {
        console.log("Fetched accounts...", accounts);
      }));
  }

  render() {
    const data = this.formatAccountData();
    let revenueArr = [];
    revenueArr.push(this.state.revenue);

    // Calculate Net Income (Loss)
    let netIncomeArr = [];
    let totalExpenses = this.calculateTotalExpenses();
    netIncomeArr.push({
      header: "Net Income (Loss)",
      amount: this.state.revenue.creditBalance - totalExpenses
    });

    return (
      <div className="container">
        <h3 className="row text-center">
          <div className="col-md-12">
            NormalSide Accounting Inc.
          </div>
          <div className="col-md-12">
            Income Statement
          </div>
          <div className="col-md-12">
            For the Year Ended December 31st, 2018
          </div>
        </h3>
        <ReactTable 
          data={revenueArr}
          columns={[
            {
              Header: 'Revenue',
              accessor: 'name'
            },
            {
              Header: '',
              id: 'creditBalance',
              accessor: d => (Number(d.creditBalance)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
              Footer: (
                <span style={{ "text-decoration": "underline" }}>
                  <strong>Total Revenue: </strong>
                  {
                    "$ " + _.map(revenueArr, d => (Number(d.creditBalance)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')) 
                  }
                </span>
              )
            }
          ]}
          defaultPageSize={1}
          showPagination={false}
        />

        <ReactTable 
          data={this.state.expenseAccounts}
          columns={[
            {
              Header: 'Expenses',
              id: 'expenses',
              accessor: d => d.name
            },
            {
              Header: '',
              id: 'debitBalance',
              accessor: d => (d.debitBalance).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
              Footer: (
                <span style={{ "text-decoration": "underline" }}>
                      <strong>Total Expenses: </strong>{" "}
                      {
                        "$" + (_.sumBy(this.state.expenseAccounts, d => d.debitBalance)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
                      }
                </span>
              )
            }
          ]}
          defaultPageSize={8}
          showPagination={false}
        />

        <ReactTable 
          data={netIncomeArr}
          columns={[
            {
              Header: '',
              id: 'header',
              accessor: d => <strong>{d.header}</strong>
            },
            {
              Header: '',
              id: 'amount',
              accessor: d => <span style={{ "border-bottom": "3px double" }}>{"$ " + (d.amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</span>
            }
          ]}
          defaultPageSize={1}
          showPagination={false}
        />
      </div>
    )
  }
}

export default IncomeStatement;

