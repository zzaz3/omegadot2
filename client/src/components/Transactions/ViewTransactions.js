import React from 'react';
import ReactTable from 'react-table';

class ViewTransactions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            transactions: []
        }
    }

    componentDidMount() {
        fetch('/transactions')
          .then(res => res.json())
          .then(transactions => this.setState({ transactions: transactions }, () => console.log('Transactions fetched...', transactions)));
    }

    render(){
        return(
            <div className="container">
                <h2>TRANSACTIONS</h2>
                <ReactTable
                    data={this.state.transactions}
                    columns={[
                        {
                            Header: 'Date',
                            accessor: 'date'
                        },
                        {
                            Header: 'Accounts',
                            accessor: 'debitAccount',
                            Cell: account => (
                                <div>
                                    {account.row.name}
                                </div>
                            )
                        },
                        {
                            Header: 'Debit',
                            accessor: 'debitAmount'
                        },
                        {
                            Header: 'Credit',
                            accessor: 'creditAmount'
                        }
                    ]}
                />
            </div>
        );
    }
}

export default ViewTransactions;