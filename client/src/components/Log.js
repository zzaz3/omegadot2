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
    return date.toDateString();
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
                Header: 'Name',
                accessor: 'name'
              },
              {
                Header: 'Type',
                accessor: 'type'
              },
              {
                Header: 'ChangedBy',
                accessor: 'changedBy'
              },
              {
                Header: 'From',
                accessor: 'beforeValue'
              },
              {
                Header: 'To',
                accessor: 'afterValue'
              },
              {
                Header: 'Date',
                id: 'time',
                accessor: d => this.getFormattedDate(d),
                Cell: row => (
                  <span>
                    {row.value}
                  </span>
                )
              }
            ]}

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

