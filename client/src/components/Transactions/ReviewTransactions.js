import React from 'react';
import ReactTable from 'react-table';

class ReviewTransactions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            transactions: []
        }

        this.updateTransactionStatus = this.updateTransactionStatus.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
    }

    updateTransactionStatus(transactionId, updateData){
        fetch(`/transaction/status/update/${transactionId}`, {
            method: 'PUT',
            body: JSON.stringify(updateData),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then(res => res.json())
            .catch(err => console.log(`ERROR MESSAGE ${err}`));
    }

    onAcceptOrReject(e){
        
    }

    updateStatus = (id) => (e) => {
        var updateData = null;
        if(e.target.value == "accept"){
            updateData = {"status": "approved"}
            console.log("ACCEPTED");
        } else if(e.target.value == "reject"){
            updateData = {"status": "rejected"}
            console.log("REJECTED");
        }

        this.updateTransactionStatus(id, updateData);

        var transactions = this.state.transactions.filter(transId => transId._id != id);
        this.setState({
            transactions: transactions
        });
    }

    componentDidMount(){
        fetch('/transactions/pending')
            .then(res => res.json())
            .then(transactions => this.setState({transactions: transactions}, () => console.log('Transactions fetched...', transactions)));
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
                            accessor: d => <DebitsCredits debitAmount={d.debitAmount + ".00"} creditAmount={d.creditAmount + ".00"} />
                        },
                        {
                            Header: 'Review',
                            id: 'review',
                            accessor: d => <AcceptReject updateStatus={this.updateStatus(d._id)} />
                        }
                    ]}
                />
                
                <div className="modal" id="rejectModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Reason</h5>
                                <button class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <textarea ref="rejectReason" cols="30" rows="10"></textarea>
                                </form>
                                <button className="btn btn-danger" data-dismiss="modal" onSubmit={this.updateStatus} type="submit">Reject</button>
                            </div>
                        </div>
                    </div>
                </div>
                
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
            <button value="accept" onClick={props.updateStatus} className="btn btn-success">Approve</button>
            <button value="reject" data-toggle="modal" data-target="#rejectModal" onClick={props.updateStatus} className="btn btn-danger">Reject</button>
        </div>
    )
}
