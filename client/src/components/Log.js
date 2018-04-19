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
              }
            },
            {
              Header: 'Event Type',
              accessor: 'type'
            },
            {
              Header: 'Performed by',
              accessor: 'changedBy'
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
            if (e.row._original.data) {
              return (
                <div>
                  { e.row._original.data.description &&
                  <p>Description: {e.row._original.data.description}</p>
                  }
                  <ReactTable
                    data={e.row._original.data.debits}
                    columns={[
                      {
                        Header: 'Account',
                        accessor: 'account'
                      },
                      {
                        Header: 'Debited',
                        accessor: 'amount'
                      },
                    ]}
                    defaultPageSize={e.row._original.data.debits.length}
                    showPaginationBottom={false}
                  />
                  <ReactTable
                    data={e.row._original.data.credits}
                    columns={[
                      {
                        Header: 'Account',
                        accessor: 'account'
                      },
                      {
                        Header: 'Credited',
                        accessor: 'amount'
                      },
                    ]}
                    defaultPageSize={e.row._original.data.credits.length}
                    showPaginationBottom={false}
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

