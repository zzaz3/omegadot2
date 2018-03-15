import React from 'react';
import ReactTable from 'react-table';

class ReviewTransactions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            transactions: []
        }
    }

    componentDidMount(){
        fetch('/transactions/pending')
            .then(res => res.json())
            .then(transactions => this.setState({transactions: transactions}), () => console.log('Transactions fetched..'));
    }

    render(){
        return(
            <div className="container">
                <h2>REVIEW TRANSACTIONS</h2>
                <ReactTable
                    data={this.state.transactions}
                    columns={[
                        {
                            Header: 'Date',
                            accessor: 'date'
                        },
                        {
                            Header: 'Accounts',
                            id: 'accounts',
                            accessor: d => <TestComponent debit={d.debitAccount} credit={d.creditAccount} />
                        },
                        {
                            Header: 'Ref #',
                            accessor: 'creditAmount'
                        },
                        {
                            Header: 'Debits / Credits',
                            id: 'debits/credits',
                            accessor: d => <DebitsCredits debitAmount={d.debitAmount} creditAmount={d.creditAmount} />
                        },
                        {
                            Header: 'Review',
                            id: 'review',
                            accessor: d => <AcceptReject />
                        }
                    ]}
                />
            </div>
        );
    }
}

export default ReviewTransactions;

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

function AcceptReject(props){
    return (
        <div className="d-flex flex-row justify-content-around row-hl">
            <button className="btn btn-success">Accept</button>
            <button className="btn btn-danger">Reject</button>
        </div>
    )
}