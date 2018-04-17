import React from 'react';

class CashLedger extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            transactions: ""
        }

        this.getDebits = this.getDebits.bind(this);
        this.getCredits = this.getCredits.bind(this);
    }

    getDebits(){
        // debugger;
        let debits = [];
        let tempTransactions = this.state.transactions;
        tempTransactions.forEach(transaction => {
            // debits.push(transaction.debitEntries);
            // debits = transaction.debitEntries;
            let debitEntries = transaction.debitEntries;
            debitEntries.forEach(entry => {
                if(entry.account == "Cash"){
                    entry.date = transaction.date;
                    debits.push(entry);
                }
            });
        });
        
        debits.forEach(debit => {
            console.log(`ACCOUNT: ${debit.account} || AMOUNT: ${debit.amount} || DATE: ${debit.date}`);
        });
    }

    getCredits(){

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
                <button onClick={this.getDebits}>Get Debits</button>
            </div>
        )
    }
}

export default CashLedger;