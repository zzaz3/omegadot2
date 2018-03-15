// Test Pull
import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import 'react-bootstrap';


class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: []
    }

    this.getAccountStatus.bind(this);
  }

  getAccountStatus(account) {
    if (account.isActive)
      return 'active';
    else
      return 'inactive';
  }

  componentDidMount() {
    fetch('/accounts')
      .then(res => res.json())
      .then(accounts => this.setState({ accounts: accounts }, () => console.log('Accounts fetched...', accounts)));
  }

  render() {
    return (
      <div className="container text-left mt-5">
        <h2>ACCOUNTS</h2>
        <Link to='/accounts/add'>
          <button className="btn btn-primary mb-4">Create Account</button>
        </Link>
        <ReactTable
            data={this.state.accounts}
            columns={[
              {
                Header: 'Account #',
                accessor: 'number'
              },
              {
                Header: 'Account Name',
                accessor: 'name'
              },
              {
                Header: 'Balance',
                accessor: 'balance'
              },
              {
                Header: 'Type',
                accessor: 'type'
              },
              {
                Header: "Sub-Type",
                accessor: 'subtype'
              },
              {
                Header: 'Status',
                id: 'status',
                accessor: d => this.getAccountStatus(d),
                Cell: row => (
                  <span>
                    <span style={{color: row.value === 'inactive' ? '#ff2e00' : '#57d500'}}>
                      &#x25cf;
                    </span>
                    {row.value}
                  </span>
                )
              }
            ]}

            className="-striped -highlight"
            defaultPageSize={10}
        />
      </div>
    )
  }
}

export default Accounts;
