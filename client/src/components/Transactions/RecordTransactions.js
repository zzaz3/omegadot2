import React from 'react';
import ReactTable from 'react-table';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { withAlert } from 'react-alert';
import Dropzone from 'react-dropzone';

import TransactionEntry from './TransactionEntry';
import Entry from './Entry';

import 'react-datepicker/dist/react-datepicker.css';

class RecordTransactions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            debitEntries: [
                new Entry(1, "", 0)
            ],
            creditEntries: [
                new Entry(1, "", 0)
            ],
            debitAmountTotal: 0,
            creditAmountTotal: 0,
            description: "",
            files: [],
            date: moment(),
            selectedDebitAccount: 'None',
            selectedCreditAccount: 'None'
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTestSubmit = this.onTestSubmit.bind(this);
        this.addNewTransactionEntry = this.addNewTransactionEntry.bind(this);
        this.getDebitData = this.getDebitData.bind(this);
        this.getCreditData = this.getCreditData.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.formatEntries = this.formatEntries.bind(this);
    }

    handleChange(date) {
        this.setState({ date: date });
    }

    onDateChange(date){
        this.setState({date: date})
    }

    onDescriptionChange(e){
        this.setState({description: e.target.value});
    }

    addNewTransactionEntry(e){
        e.preventDefault();

        if(e.target.value === "debit"){
            const tempDebitEntries = this.state.debitEntries;
            const entryId = tempDebitEntries.length + 1;
            const newEntry = new Entry(entryId, "", 0);
            tempDebitEntries.push(newEntry);
            console.log(`NEW DEBIT ENTRY INDEX: ${tempDebitEntries.indexOf(newEntry)}`);
            this.setState({debitEntries: tempDebitEntries});
        } else if(e.target.value === "credit") {
            const tempCreditEntries = this.state.creditEntries;
            const entryId = tempCreditEntries.length + 1;
            const newEntry = new Entry(entryId, "", 0);
            tempCreditEntries.push(newEntry);
            console.log(`NEW CREDIT ENTRY INDEX: ${tempCreditEntries.indexOf(newEntry)}`);
            this.setState({creditEntries: tempCreditEntries});
        }
    }

    formatEntries(entries){
        let formattedEntries = []
        entries.forEach(entry => {
            formattedEntries.push({
                account: entry.account,
                amount: entry.amount
            });
        });

        return formattedEntries;
    }

    // POST Request For Adding Transaction To DB
    createTransacton(newTransaction) {
        fetch('/transaction/add', {
            method: 'POST',
            body: JSON.stringify(newTransaction),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then(res => res.json())
            .catch(err => console.log(`ERROR MESSAGE ${err}`));
    }

    onSubmit(e) {
        e.preventDefault();

        if(this.state.selectedDebitAccount == 'None') {
            return this.props.alert.error('SELECT A DEBIT ACCOUNT');
        }
        if(this.state.selectedCreditAccount == 'None') {
            return this.props.alert.error('SELECT A CREDIT ACCOUNT');
        }
        if(this.state.selectedDebitAccount == this.state.selectedCreditAccount){
            return this.props.alert.error('CANNOT CREDIT AND DEBIT SAME ACCOUNT');
        }

        if(Math.sign(this.refs.debitAmount.value) === -1 || isNaN(this.refs.debitAmount.value)) {
            return this.props.alert.error('INVALID DEBIT AMOUNT');
        }
        if(Math.sign(this.refs.creditAmount.value) === -1 || isNaN(this.refs.creditAmount.value)) {
            return this.props.alert.error('INVALID CREDIT AMOUNT');
        }

        if(this.state.debitRefNum == '' || isNaN(this.state.debitRefNum)){
            return this.props.alert.error('INVALID DEBIT REF#');
        }
        if(this.state.creditRefNum == '' || isNaN(this.state.debitRefNum)){
            return this.props.alert.error('INVALID CREDIT REF#');
        }

        if(this.refs.debitAmount.value != this.refs.creditAmount.value){
            return this.props.alert.error("DEBIT AMOUNT DOESN'T MATCH CREDIT AMOUNT");
        }

        const newTransaction = {
            debitAccount: this.state.selectedDebitAccount,
            debitAmount: this.refs.debitAmount.value,
            debitRefNum: this.state.debitRefNum,
            creditAccount: this.state.selectedCreditAccount,
            creditAmount: this.refs.creditAmount.value,
            creditRefNum: this.state.creditRefNum,
            description: this.refs.description.value,
            date: this.state.date.format('L').toString(),
            status: 'pending'
        }
        this.createTransacton(newTransaction);
        this.setState({
            selectedDebitAccount: 'None',
            selectedCreditAccount: 'None',
            debitRefNum: '',
            creditRefNum: '',
            date: moment()
        });
        this.refs.debitAmount.value = '';
        this.refs.creditAmount.value = '';
        this.refs.description.value = '';
    }

    onTestSubmit(e){
        e.preventDefault();

        const debitEntries = this.formatEntries(this.state.debitEntries);
        const creditEntries = this.formatEntries(this.state.creditEntries);

        const newTransaction = {
            debitEntries: debitEntries,
            // creditEntries: creditEntries
            // date: this.state.date.format('L').toString(),
            // description: this.state.description,
            // status: "pending"
        }
        this.createTransacton(newTransaction);

        console.log(`NEW TRANSACTION: ${Object.entries(newTransaction).toString()}`);
        

        // -----------------------------------
        // const debitEntries = this.state.debitEntries;
        // debitEntries.forEach(entry => {
        //     console.log(`ID(debit): ${entry.id} || ACCOUNT(debit): ${entry.account} || AMOUNT(debit): ${entry.amount}`);
        // });

        // const creditEntries = this.state.creditEntries;
        // creditEntries.forEach(entry => {
        //     console.log(`ID(credit): ${entry.id} || ACCOUNT(credit): ${entry.account} || AMOUNT(credit): ${entry.amount}`);
        // });
    }

    getDebitData(entry){
        const tempDebitEntries = this.state.debitEntries;
        for(let i = 0; i < tempDebitEntries.length; i++) {
            if(entry.id == tempDebitEntries[i].id){
                tempDebitEntries[i] = entry;
            }
        }

        this.setState({debitEntries: tempDebitEntries});

        console.log(`ACCOUNT DATA (debit): ${entry.id} || ${entry.account} || ${entry.amount}`);
    }

    getCreditData(entry){
        const tempCreditEntries = this.state.creditEntries;
        for(let i = 0; i < tempCreditEntries.length; i++) {
            if(entry.id == tempCreditEntries[i].id){
                tempCreditEntries[i] = entry;
            }
        }

        this.setState({creditEntries: tempCreditEntries});

        console.log(`ACCOUNT DATA (credit): ${entry.id} || ${entry.account} || ${entry.amount}`);
    }

    // LIFECYCLE METHODS
    componentDidMount() {
        fetch('/accounts')
            .then(res => res.json())
            .then(accounts => this.setState({ accounts: accounts }, () => console.log('Accounts fetched...', accounts)));
    }

    render() {
        return (
            <div className="container mt-3">
                <form onSubmit={this.onTestSubmit} className="m-auto">
                    <div className="row">
                        <div className="col-md-4">
                            <div>
                                <DatePicker
                                    selected={this.state.date}
                                    onChange={this.onDateChange}
                                    className="form-control"
                                />
                            </div>
                            <div>
                                <textarea onChange={this.onDescriptionChange} name="description" cols="25" rows="5" placeholder="Description" className="form-control" ref="description"></textarea>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div>
                                {
                                    this.state.debitEntries.map(entry => {
                                        return(
                                            <div className="row">
                                                <div className="col-md-10">
                                                    <TransactionEntry id={this.state.debitEntries.length} sendAccount={this.getDebitData}
                                                    sendAmount={this.getDebitData} />
                                                </div>
                                                <div className="col-md-2">
                                                    <button onClick={this.addNewTransactionEntry} className="btn" value="debit">Add New</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="ml-5 mt-3">
                                {
                                    this.state.creditEntries.map(entry => {
                                        return(
                                            <div className="row">
                                                <div className="col-md-10">
                                                    <TransactionEntry id={this.state.creditEntries.length} sendAccount={this.getCreditData}
                                                    sendAmount={this.getCreditData} />
                                                </div>
                                                <div className="col-md-2">
                                                    <button onClick={this.addNewTransactionEntry} className="btn" value="credit">Add New</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                                                 
                        <input type="submit" value="Submit" className="btn btn-primary ml-auto my-2" />
                    </div>
                </form>
                {/* OLD FORM */}
                <form onSubmit={this.onSubmit} className="m-auto">
                    <div className="row">
                        <div className="col-md-2">
                            <label htmlFor="debit">Debit</label>
                            <select onChange={this.onAccountChange} value={this.state.selectedDebitAccount} className="form-control" name="debitAccount">
                            <option value="None" selected>None</option>
                            {this.state.accounts.map(account => <option>{account.name}</option>)}
                            </select>
                            <input type="text" placeholder="$0.00" ref="debitAmount" className="form-control" />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="credit">Credit</label>
                            <select onChange={this.onAccountChange} value={this.state.selectedCreditAccount} className="form-control" name="creditAccount">
                            <option value="None" selected>None</option>
                            {this.state.accounts.map(account => <option>{account.name}</option>)}
                            </select>
                            <input type="text" placeholder="$0.00" ref="creditAmount" className="form-control" />
                        </div>
                        <div className="col-md-4 d-flex">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <textarea name="description" cols="25" rows="5" placeholder="Description" className="form-control" ref="description"></textarea>
                                    </div>
                                    <div className="row">
                                        <Dropzone className="ignore ml-auto my-2" onDrop={this.onDrop}>
                                            <button type="button" className="btn btn-success">Attach</button>
                                        </Dropzone>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <DatePicker
                                            inline
                                            selected={this.state.date}
                                            onChange={this.handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="row">
                                        <input type="submit" value="Create" className="btn btn-primary ml-auto my-2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withAlert(RecordTransactions);