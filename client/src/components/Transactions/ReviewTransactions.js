import React from 'react';
import ReactTable from 'react-table';

class ReviewTransactions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            transactions: []
        }

        this.updateTranactionStatus = this.updateTranactionStatus.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
    }

    updateTranactionStatus(transaction, transactionStatus){
        fetch(`/transaction/status/update/${transaction._id}`, {
            method: 'PUT',
            body: JSON.stringify(transactionStatus),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then(res => res.json())
            .catch(err => console.log(`ERROR MESSAGE ${err}`));
    }

    onAcceptOrReject(){
        const approved = {status: 'approved'}
        this.updateTranactionStatus()
    }

    updateStatus(e){
        console.log(`Status Updated !!! ${e.target.value}`);
    }

    componentDidMount(){
        fetch('/transactions')
            .then(res => res.json())
            .then(transactions => this.setState({transactions: transactions}), () => console.log('Transactions fetched...'));
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
                            Header: 'Review',
                            id: 'review',
                            accessor: d => <AcceptReject updateStatus={this.updateStatus} />
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

function ReferenceNums(props){
    return (
        <div>
            <div className="text-left">{props.debitRefNum}</div>
            <div className="text-right">{props.creditRefNum}</div>
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
            <button value="approved" onClick={props.updateStatus} className="btn btn-success">Approve</button>
            <button value="rejected" onClick={props.updateStatus} className="btn btn-danger">Reject</button>
        </div>
    )
}
