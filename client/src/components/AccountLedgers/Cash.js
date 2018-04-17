import React from 'react';

class CashLedger extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            transactions: []
        }
    }

    
    componentDidMount(){
        fetch('/transactions/approved')
            .then(res => res.json())
            .then(transactions => this.setState({ transactions: transactions}, () => {
                console.log('Accounts fetched...', transactions);
            }))
    }

    render(){
        return(
            <div>
                <h1>CASH LEDGER</h1>
            </div>
        )
    }
}

export default CashLedger;