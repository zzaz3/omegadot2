// Test Pull
import React from 'react';
import ReactTable from 'react-table';
import 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadLog } from '../actions/log';

class Log extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.getLog();
  }

  async getLog() {
    const { loadLogAction } = this.props;

    await fetch(
      '/log',
      {
        method: 'GET',
        credentials: 'same-origin',
      },
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null
      })
      .then((json) => {
        loadLogAction(json);
      })
      .catch((error) => {
        // Error handling here.
      });
  }

  getFormattedDate(data) {
    let date = new Date(data.time)
    return date.toDateString() + " at " + date.toLocaleTimeString('en-US');
  }

  render() {
    const { log } = this.props;
    return (
      <div className="container text-left mt-5">
        <h2>LOG</h2>
        <ReactTable
          data={log}
          columns={[
            {
              expander: true,
              Header: () => <strong>More</strong>,
              width: 65,
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
              },
              Footer: () => <span>&hearts;</span>
            },
            {
              Header: 'Event Type',
              accessor: 'type',
              width: 200,
            },
            {
              Header: 'Performed by',
              accessor: 'changedBy',
              width: 150,
            },
            {
              Header: 'Date and Time',
              id: 'time',
              accessor: d => this.getFormattedDate(d),
              Cell: row => (
                <span>
                  {row.value}
                </span>
              )
            }
          ]}
          SubComponent={e => {
            console.log(e);
            if (e.row._original.debits) {
              return (
                <div>
                  <h2>Debits</h2>
                  <ReactTable
                    data={e.row._original.debits}
                    columns={[
                      {
                        Header: 'ID',
                        accessor: 'id'
                      },
                      {
                        Header: 'Account',
                        accessor: 'account'
                      },
                      {
                        Header: 'Amount',
                        accessor: 'amount'
                      },
                    ]}
                  />
                  <h2>Credits</h2>
                  <ReactTable
                    data={e.row._original.credits}
                    columns={[
                      {
                        Header: 'Account',
                        accessor: 'account'
                      },
                      {
                        Header: 'Type',
                        accessor: 'type'
                      },
                      {
                        Header: 'Amount',
                        accessor: 'amount'
                      },
                    ]}
                  />
                </div>
              );
            }
            else if (e.row._original.type == "Account Created") {
              return(
                <div>
                  <p>Account name: {e.row._original.name}</p>
                </div>
              );
            }
          }}
          className="-striped -highlight"
          defaultPageSize={10}
        />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadLogAction: loadLog,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    log: state.log,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Log);

