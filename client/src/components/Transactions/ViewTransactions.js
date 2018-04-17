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
                            accessor: 'description',
                            Cell: row => (
                                <div className="text-nowrap">{row.value}</div>
                            )
                        },
                        {
                            Header: "",
                            accessor: "description",
                            expander: true,
                            width: 50,
                            Expander: ({ isExpanded, ...rest }) =>
                            <div>
                                {/* {
                                    isExpanded
                                    ? <button className="btn btn-danger">-</button>
                                    : <button className="btn btn-success">+</button>
                                } */}
                                {
                                    isExpanded
                                    ? <span>&#x2299;</span>
                                    : <span>&#x2295;</span>
                                }
                            </div>
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
                        },
                    ]}
                    SubComponent={(row) => {
                        const columns = [
                        {
                            Header: "Desc.",
                            accessor: "description",
                        }]
                    }}
                    />
            </div>
        );
    }
}

export default ViewTransactions;

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
                                {`${entry.amount}.00`}
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
                                {`${entry.amount}.00`}
                                <hr className="m-1"/>
                            </div>
                        )
                    })
                } 
            </div>
        </div>
    );
}