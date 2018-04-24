import React from 'react';
import ReactTable from 'react-table';
import _ from "lodash";

class RetainedEarnings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      revenue: [],
      expenseAccounts: [],
      retainedEarningsStart: [{
        header: "Beg. Retained Earnings, 4/1/2018",
        amount: 0
      }],
      retainedEarningsEnd: [{
        header: "End Retained Earnings, 4/30/2018",
        amount: 0
      }],
      dividends: [{
        header: "Less: Dividends",
        amount: 0
      }]
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
    let revenueArr = [];
    revenueArr.push(this.state.revenue);

    // Calculate Net Income (Loss)
    let netIncomeArr = [];
    let totalExpenses = this.calculateTotalExpenses();
    netIncomeArr.push({
      header: "Add: Net Income",
      amount: this.state.revenue.creditBalance - totalExpenses
    });

    let retainedEarningsStartValuesForCalculation = [
      {
        header: "End Retained Earnings, 4/30/2018",
        retainedEarningsStartAmount: this.state.retainedEarningsStart[0].amount,
        netIncome: this.state.revenue.creditBalance - totalExpenses,
        dividendsAmount: this.state.dividends[0].amount
      }
    ]
    console.log(retainedEarningsStartValuesForCalculation);

    return (
      <div className="container">
        <h3 className="row text-center">
          <div className="col-md-12">
            NormalSide Accounting Inc.
          </div>
          <div className="col-md-12">
            Statement of Retained Earnings
          </div>
          <div className="col-md-12">
            For the Year Ended April 30th, 2018
          </div>
        </h3>

        <ReactTable 
          data={this.state.retainedEarningsStart}
          columns={[
            {
              Header: '',
              id: 'header',
              accessor: d => <strong>{d.header}</strong>
            },
            {
              Header: '',
              id: 'amount',
              accessor: d => <span>{"$ " + (d.amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</span>
            }
          ]}
          defaultPageSize={1}
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
              accessor: d => <span>{"$ " + (d.amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</span>
            }
          ]}
          defaultPageSize={1}
          showPagination={false}
        />

        <ReactTable 
          data={this.state.dividends}
          columns={[
            {
              Header: '',
              id: 'header',
              accessor: d => <strong>{d.header}</strong>
            },
            {
              Header: '',
              id: 'amount',
              accessor: d => <span>{"$ " + (d.amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</span>
            }
          ]}
          defaultPageSize={1}
          showPagination={false}
        />

        <ReactTable 
          data={retainedEarningsStartValuesForCalculation}
          columns={[
            {
              Header: '',
              id: 'header',
              accessor: d => <strong>{d.header}</strong>
            },
            {
              Header: '',
              id: 'amount',
              accessor: d => <span>{"$ " + (d.retainedEarningsStartAmount + d.netIncome + d.dividendsAmount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</span>
            }
          ]}
          defaultPageSize={1}
          showPagination={false}
        />

      </div>
    )
  }
}

export default RetainedEarnings;

