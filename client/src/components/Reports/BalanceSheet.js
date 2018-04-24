import React from 'react';
import ReactTable from 'react-table';

class BalanceSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const data = [
      {
        firstName: "Stephens",
        lastName: "Jean-Jacques",
        age: 23
      }
    ]

    return (
      <div>
        <h1>BALANCE SHEET</h1>
        <ReactTable 
          data={data}
          columns={[
            {
              Header: "Header 1",
              accessor: 'firstName'
              
            }
          ]}
        />
      </div>
    )
  }
}

export default BalanceSheet;
