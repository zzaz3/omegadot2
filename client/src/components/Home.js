import React from 'react';
import RecordTransactions from './Transactions/RecTrans' 
import Basic from './BasicAttachment';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>NORMAL</h1>
        <h1>SIDE</h1>
        <h1>ACCOUNTING</h1>
        <h4>(You Won't Remember Us.)</h4>
        {/* <RecordTransactions /> */}
      </div>
    )
  }
}

export default Home;
