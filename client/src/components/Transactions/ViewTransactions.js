import React from 'react';
import ReactTable from 'react-table';

class ViewTransactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      expandedColumns: []
    }
  }

  componentDidMount() {
    fetch('/transactions')
      .then(res => res.json())
      .then(transactions => {
          var temp = transactions.map(x => true);
          debugger;
          this.setState({ transactions: transactions, expandedColumns: temp});
          console.log('Transactions fetched...', transactions, this.state.expandedColumns);
        })
  }

  getFormattedData(data) {
    return data.file;
  }

  render() {
    return (
      <div className="container">
        <h2>TRANSACTIONS</h2>
        <ReactTable
          data={this.state.transactions}
          columns={[
            {
                expander: true,
                Header: () => <p></p>,
                width: 0,
                Expander: ({ isExpanded, ...rest }) =>
                  <div>
                    {isExpanded
                      ? <span>&#x2299;</span>
                      : <span>&#x2295;</span>}
                  </div>,
                style: {
                  cursor: "pointer",
                  fontSize: 25,
                  padding: "0",
                  textAlign: "center",
                  userSelect: "none"
                }
              },
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
            {
              Header: 'Attatchments',
              id: 'file',
              accessor: d => this.getFormattedData(d),
              Cell: row => ( row.value ?
                <a href={row.value} download="">download</a> :
                <p>n/a</p>
              )
            }
          ]}
          defaultSorted={[
            {
              id: "date",
              desc: true
            }
          ]}
          SubComponent={e => {
            if (e.row._original.description) {
              return (
                <div>
                  { e.row._original.description &&
                  <p>Description: {e.row._original.description}</p>
                  }
                </div>
              );
            }
          }}
          expanded={this.state.expandedColumns}
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
