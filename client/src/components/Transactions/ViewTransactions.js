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
                <TestComponent />
                <h2>TRANSACTIONS</h2>
                <ReactTable
                    data={this.state.transactions}
                    columns={[
                        {
                            Header: 'Date',
                            id: 'date',
                            accessor: d => d.date
                        },
                        {
                            Header: 'Ref #',
                            id: 'refNums',
                            accessor: d => <ReferenceNums debitRefNum={d.debitRefNum} creditRefNum={d.creditRefNum}/>
                        },
                        {
                            Header: 'Accounts',
                            id: 'accounts',
                            accessor: d => <TestComponent debit={d.debitAccount} credit={d.creditAccount} />
                        },
                        {
                            Header: 'Debits / Credits',
                            id: 'debits/credits',
                            accessor: d => <DebitsCredits debitAmount={d.debitAmount} creditAmount={d.creditAmount} />
                        },
                        {
                            Header: 'Status',
                            accessor: 'status',
                            Cell: row => (
                                <span>
                                    <span style={{
                                    color: row.value === 'rejected' ? '#ff2e00'
                                        : row.value === 'pending' ? '#ffbf00'
                                        : '#57d500',
                                    transition: 'all .3s ease'
                                    }}>
                                        &#x25cf;
                                    </span> 
                                    {
                                        row.value === 'rejected' ? 'Rejected'
                                        : row.value === 'pending' ? `Pending`
                                        : 'Accepted'
                                    }
                                </span>
                                )
                        }
                    ]}
                />
            </div>
        );
    }
}

export default ViewTransactions;

function TestComponent(props){
    return (
        <div>
            <div className="text-left">{props.debit}</div>
            <div className="text-right">{props.credit}</div>
        </div>
    )
}

function DebitsCredits(props){
    return (
        <div>
            <div className="text-left">{props.debitAmount}</div>
            <div className="text-right">{props.creditAmount}</div>
        </div>
    )
}

function ReferenceNums(props){
    return (
        <div>
            <div className="text-left">{props.debitRefNum}</div>
            <div className="text-right">{props.creditRefNum}</div>
        </div>
    )
}