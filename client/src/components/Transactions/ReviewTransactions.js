import React from 'react';
import ReactTable from 'react-table';

class ReviewTransactions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            transactions: [],
            rejectReason: "",
            accounts: [],
            tempDebits: "",
            tempCredits: ""
        }

        this.updateTransactionStatus = this.updateTransactionStatus.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.onRejectReasonChange = this.onRejectReasonChange.bind(this);
        this.getTransaction = this.getTransaction.bind(this);
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

    onRejectReasonChange(e){
        this.setState({rejectReason: e.target.value}, console.log(this.state.rejectReason));
    }

    getTransaction(id){
        
    }

    updateStatus = (id) => (e) => {
        e.preventDefault();

        console.log(`TRANSACTION ID: ${id}`);
        fetch(`/transaction/${id}`)
            .then(res => res.json())
            .then(transaction => {
                this.setState({
                    tempDebits: transaction.debitEntries,
                    tempCredits: transaction.creditEntries
                }, () => {
                    let tempDebits = this.state.tempDebits
                    for(let i = 0; i < tempDebits.length; i++){
                        let updateData = {
                            "debitBalance": `${tempDebits[i].amount}`
                        };
                        fetch(`/account/${tempDebits[i].account}`, {
                            method: 'PUT',
                            body: JSON.stringify(updateData),
                            headers: new Headers({
                                "Content-Type": "application/json"
                            }) 
                        }).then(res => res.json())
                            .catch(err => console.log(`ERROR MESSAGE ${err}`));
                    }

                    let tempCredits = this.state.tempCredits
                    for(let i = 0; i < tempCredits.length; i++){
                        let updateData = {
                            "creditBalance": `${tempCredits[i].amount}`
                        };
                        fetch(`/account/${tempCredits[i].account}`, {
                            method: 'PUT',
                            body: JSON.stringify(updateData),
                            headers: new Headers({
                                "Content-Type": "application/json"
                            }) 
                        }).then(res => res.json())
                            .catch(err => console.log(`ERROR MESSAGE ${err}`));
                    }
                });
            });

        

        var updateData = null;
        if(e.target.value == "accept"){
            updateData = {
                "status": "approved"
            }
            console.log("ACCEPTED");
        } else if(e.target.value == "reject"){
            updateData = {
                "status": "rejected",
                "rejectReason": this.state.rejectReason
            }
            console.log(`REJECTS REASON: ${this.state.rejectReason}`);
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
        
        fetch('/accounts')
            .then(res => res.json())
            .then(accounts => this.setState({accounts: accounts}, () => console.log('Accounts fetch...', accounts)));
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
                            id: 'date',
                            accessor: d => d.date                        
                        },
                        {
                            Header: 'Accounts',
                            id: 'accounts',
                            accessor: d => <DisplayAccounts debitEntries={d.debitEntries} creditEntries={d.creditEntries} />
                        },
                        {
                            Header: 'Debits',
                            id: 'debits',
                            accessor: d => <DisplayDebits debitEntries={d.debitEntries} creditEntries={d.creditEntries} />
                        },
                        {
                            Header: 'Credits',
                            id: 'credits',
                            accessor: d => <DisplayCredits creditEntries={d.creditEntries} debitEntries={d.debitEntries} />
                        },
                        {
                            Header: 'Description',
                            id: 'description',
                            accessor: d => d.description
                        },
                        {
                            Header: 'Review',
                            id: 'review',
                            accessor: d => <AcceptReject updateStatus={this.updateStatus(d._id)} onRejectReasonChange={this.onRejectReasonChange}/>
                        }
                    ]}
                    defaultSorted={[
                        {
                            id: "date",
                            desc: true
                        }
                    ]}
                />
                
                <div className="modal" id="rejectModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Reason</h5>
                                <button className="close" data-dismiss="modal">&times;</button>
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

function DisplayAccounts(props){
    return (
        <div>
            <div className="text-left">
                {
                    props.debitEntries.map(entry => {
                        return(
                            <div>
                                {entry.account}
                                <hr className="m-1"/>
                            </div>
                        )
                    })
                }
            </div>
            <div className="text-left ml-5">
                {
                    props.creditEntries.map(entry => {
                        return(
                            <div>
                                {entry.account}
                                <hr className="m-1"/>
                            </div>
                        )
                    })
                } 
            </div>
        </div>
    );
}

function DisplayDebits(props){
    return (
        <div>
            <div className="text-right">
                {
                    props.debitEntries.map(entry => {
                        return(
                            <div>
                                {`${entry.amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}`}
                                <hr className="m-1"/>
                            </div>
                        )
                    })
                }
            </div>
            <div className="text-center">
                {
                    props.creditEntries.map(entry => {
                        return(
                            <div>
                                {" - "}
                                <hr className="m-1"/>
                            </div>
                        )
                    })
                } 
            </div>
        </div>
    );
}

function DisplayCredits(props){
    return(
        <div>
            <div className="text-center">
                {
                    props.debitEntries.map(entry => {
                        return(
                            <div>
                                {" - "}
                                <hr className="m-1"/>
                            </div>
                        )
                    })
                }
            </div>
            <div className="text-right">
                {
                    props.creditEntries.map(entry => {
                        return(
                            <div>
                                {`${entry.amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}`}
                                <hr className="m-1"/>
                            </div>
                        )
                    })
                } 
            </div>
        </div>
    );
}

function AcceptReject(props){
    return (
        <div className="d-flex flex-row justify-content-around row-hl">
            <button value="accept" onClick={props.updateStatus} className="btn btn-success">Approve</button>
            <button value="reject" data-toggle="modal" data-target="#rejectModal" className="btn btn-danger">Reject</button>
            <div className="modal" id="rejectModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Reason</h5>
                            <button class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={props.updateStatus}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <textarea onChange={props.onRejectReasonChange} ref="rejectReason" cols="30" rows="10"></textarea>
                                    </div>
                                    <div className="col-md-12">
                                        <button value="reject" onClick={props.updateStatus} className="btn btn-danger" data-dismiss="modal">Reject</button>
                                    </div>
                                </div>                                                        
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
