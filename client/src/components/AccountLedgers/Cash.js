import React from 'react';
import ReactTable from 'react-table';

class CashLedger extends React.Component {
    constructor(props){
        super(props);
        this.state = {
<<<<<<< HEAD
            transactions: ""
=======
            transactions: "",
            data: [],
            balance: {}
>>>>>>> finished cash ledger
        }

        this.getDebits = this.getDebits.bind(this);
        this.getCredits = this.getCredits.bind(this);
<<<<<<< HEAD
    }

    getDebits(){
        // debugger;
        let debits = [];
        let tempTransactions = this.state.transactions;
        tempTransactions.forEach(transaction => {
            // debits.push(transaction.debitEntries);
            // debits = transaction.debitEntries;
=======
        this.getApprovedTransactions = this.getApprovedTransactions.bind(this);
        this.calculateBalance = this.calculateBalance.bind(this);
    }

    getDebits(){
        let debits = [];
        let tempTransactions = this.state.transactions;
        tempTransactions.forEach(transaction => {
>>>>>>> finished cash ledger
            let debitEntries = transaction.debitEntries;
            debitEntries.forEach(entry => {
                if(entry.account == "Cash"){
                    entry.date = transaction.date;
<<<<<<< HEAD
=======
                    entry.type = "debit";
>>>>>>> finished cash ledger
                    debits.push(entry);
                }
            });
        });
        
        debits.forEach(debit => {
<<<<<<< HEAD
            console.log(`ACCOUNT: ${debit.account} || AMOUNT: ${debit.amount} || DATE: ${debit.date}`);
        });
    }

    getCredits(){

=======
            console.log(`ACCOUNT: ${debit.account} || AMOUNT: ${debit.amount} || DATE: ${debit.date} || TYPE: ${debit.type}`);
        });

        return debits;
    }

    getCredits(){
        let credits = [];
        let tempTransactions = this.state.transactions;
        tempTransactions.forEach(transaction => {
            let creditEntries = transaction.creditEntries;
            creditEntries.forEach(entry => {
                if(entry.account == "Cash"){
                    entry.date = transaction.date;
                    entry.type = "credit";
                    credits.push(entry);
                }
            });
        });
        
        credits.forEach(credit => {
            console.log(`ACCOUNT: ${credit.account} || AMOUNT: ${credit.amount} || DATE: ${credit.date} || TYPE: ${credit.type}`);
        });

        return credits;
    }

    calculateBalance(data){
        let debitTotal = 0;
        let creditTotal = 0;

        for(let i = 0; i < data.length; i++){
            if(data[i].type == "debit"){
                debitTotal += data[i].amount;
            } else if(data[i].type == "credit"){
                creditTotal += data[i].amount;
            }
        }

        let balance = Math.abs(debitTotal - creditTotal);
        console.log(`BALANCE: ${balance}`);

        if(debitTotal > creditTotal){
            return {balanceType: "debit", balance: balance}
        } else if(creditTotal > debitTotal){
            return {balanceType: "credit", balance: balance}
        }
    }

    async getApprovedTransactions(){
        await fetch('/transactions/approved')
                .then(res => res.json())
                .then(transactions => this.setState({ transactions: transactions}, () => {
                    console.log('Accounts fetched...', transactions);
                }))
                .then( () => {
                    let data = this.getDebits().concat(this.getCredits()); 
                    this.setState({
                        data: data
                    }, () => {
                        console.log(this.state.data);
                    });  
                }
            )

        let balance = this.calculateBalance(this.state.data);
        this.setState({balance: balance});
        console.log(`BALANCE TYPE: ${balance.balanceType} | BALANCE AMOUNT: ${balance.balance}`);
>>>>>>> finished cash ledger
    }

    componentDidMount(){
        this.getApprovedTransactions();
    }


    render(){
        return(
            <div className="container">
                <h1>CASH LEDGER</h1>
<<<<<<< HEAD
                <button onClick={this.getDebits}>Get Debits</button>
=======
                <ReactTable
                data={this.state.data}
                columns={[
                    {
                        Header: 'Date',
                        id: 'date',
                        accessor: d => d.date
                    },
                    {
                        Header: 'Debit',
                        id: 'debit',
                        accessor: d => <DisplayDebits type={d.type} amount={d.amount} />,
                        Footer: (
                            <div>
                                {this.state.balance.balanceType == "debit" ? <strong>{`BALANCE: ${(this.state.balance.balance).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}`}</strong> : ""}
                            </div>
                        ) 
                        
                    },
                    {
                        Header: 'Credit',
                        id: 'credit',
                        accessor: d => <DisplayCredits type={d.type} amount={d.amount} />,
                        Footer: (
                            <div>
                                {this.state.balance.balanceType == "credit" ? <strong>{`BALANCE: ${(this.state.balance.balance).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}`}</strong> : ""}
                            </div>
                        ) 
                    }
                ]}
                defaultPageSize={15}
                />
>>>>>>> finished cash ledger
            </div>
        )
    }
}

export default CashLedger;

function DisplayDebits(props){
    if(props.type == "debit"){
        return(
            <div className="text-right">
                {`${props.amount}.00`}
            </div>
        )   
    } else{
        return(
            <div className="text-center">
                {" - "}
            </div>
        )
    }
}

function TestComponent(props){
    return(
        <div>
            DEBIT BALANCE
        </div>
    )
}

function DisplayCredits(props){
    if(props.type == "credit"){
        return(
            <div className="text-right">
                {`${props.amount}.00`}
            </div>
        )
    } else{
        return(
            <div className="text-center">
                {" - "}
            </div>
        )
    }
}

function DisplayDebitBalance(props){
    if(props.balance.balanceType == "debit"){
        return(
            <div>
                {`BALANCE: ${props.balance}`}
            </div>
        )
    }
}

function DisplayCreditBalance(props){
    if(props.balanceType == "credit"){
        return(
            <div>
                {`BALANCE: ${props.balance}`}
            </div>
        )
    }
}