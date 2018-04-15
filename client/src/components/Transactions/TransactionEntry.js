import React from 'react';
import Entry from './Entry'

class TransactionEntry extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            accounts: [],
            entry: new Entry(this.props.id, "", 0)
        }

        this.onAccountChange = this.onAccountChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
    }

    onAccountChange(e){
        const id = this.state.entry.id;
        const account = e.target.value;
        const amount = this.state.entry.amount;

        this.setState({entry: new Entry(id, account, amount)}, () => {
            this.props.sendAccount(this.state.entry);

            var entry = Object.entries(this.state.entry);
            console.log(`ACCOUNT CHANGE: ${entry.toString()}`);
        });
    }

    onAmountChange(e){
        var id = this.state.entry.id;
        var account = this.state.entry.account;
        var amount = e.target.value;

        this.setState({entry: new Entry(id, account, amount)}, () => {
            this.props.sendAmount(this.state.entry);

            var entry = Object.entries(this.state.entry);
            console.log(`AMOUNT CHANGE: ${entry.toString()}`);
        }); 
    }

    componentDidMount(){
        fetch('/accounts')
            .then(res => res.json())
            .then(accounts => this.setState({ accounts: accounts}, () => {
                console.log('Accounts fetched...', accounts);
            }))
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <select onChange={this.onAccountChange} value={this.state.entry.account} id="entryAccount" className="form-control">
                            <option value="none" selected>None</option>
                            {
                                this.state.accounts.map(
                                    account => <option>{account.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="col-md-6">
                        <input onChange={this.onAmountChange} type="text" id="entryAmount" placeholder="$0.00" className="form-control"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default TransactionEntry;