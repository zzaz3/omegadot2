import React from 'react';
import ReactTable from 'react-table';
import DatePicker from 'react-datepicker';

import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom';

import moment from 'moment';
import { withAlert } from 'react-alert';
import Dropzone from 'react-dropzone';
import {loadLog, transactionOccured} from "../../actions/log";
import {Button} from 'reactstrap';

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
            file: "",
            fileName: "",
            date: moment(),
            transactionType: "REG",
            selectedDebitAccount: 'None',
            selectedCreditAccount: 'None',
            redirect: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTestSubmit = this.onTestSubmit.bind(this);
        this.addNewTransactionEntry = this.addNewTransactionEntry.bind(this);
        this.removeTransactionEntry = this.removeTransactionEntry.bind(this);
        this.removeDebitTransactionEntry = this.removeDebitTransactionEntry.bind(this);
        this.removeCreditTransactionEntry = this.removeCreditTransactionEntry.bind(this);
        this.getDebitData = this.getDebitData.bind(this);
        this.getCreditData = this.getCreditData.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onFormClear = this.onFormClear.bind(this);
        this.formatEntries = this.formatEntries.bind(this);
        this.debitsEqualCredits = this.debitsEqualCredits.bind(this);
        this.amountIsNumber = this.amountIsNumber.bind(this);
        this.accountIsSelected = this.accountIsSelected.bind(this);
        this.amountIsZero = this.amountIsZero.bind(this);
        this.setFile = this.setFile.bind(this);
        this.updateTempAccountBalances = this.updateTempAccountBalances.bind(this);
        this.onTransactionTypeChange = this.onTransactionTypeChange.bind(this);
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

    onTransactionTypeChange(e){
        this.setState({transactionType: e.target.value});
    }

    onFormClear(e){
        e.preventDefault();
        window.location.reload();
    }

    setFile(e) {
        e.preventDefault();
        var file    = document.querySelector('input[type=file]').files[0];

        this.setState({file: file});
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

    removeTransactionEntry(e){
        e.preventDefault();

        if(e.target.value === "debit" && this.state.debitEntries.length > 1){
            const tempDebitEntries = this.state.debitEntries;
            tempDebitEntries.pop();
            this.setState({debitEntries: tempDebitEntries});
        } else if(e.target.value === "credit" && this.state.creditEntries.length > 1){
            const tempCreditEntries = this.state.creditEntries;
            tempCreditEntries.pop();
            this.setState({creditEntries: tempCreditEntries});
        }
    }

    updateTempAccountBalances(){
        let debits = this.state.debitEntries;
        for(let i = 0; i < debits.length; i++){
            
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
      const { logAction, auth } = this.props;
      logAction(newTransaction, auth.username);
        fetch('/transaction/add', {
            method: 'POST',
            body: JSON.stringify(newTransaction),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then(res => {
            if(res.status === 200){
                return res.json
            }
          res.json();
      })
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

    debitsEqualCredits(){
        let debits = this.state.debitEntries;
        let debitsTotal = 0;
        let credits = this.state.creditEntries;
        let creditsTotal = 0;

        for(let i = 0; i < debits.length; i++){
            debitsTotal += Number(debits[i].amount);
        }

        for(let i = 0; i < credits.length; i++){
            creditsTotal += Number(credits[i].amount);
        }

        console.log(`DEBIT TOTAL: ${debitsTotal} | CREDIT TOTAL: ${creditsTotal}`);

        if(debitsTotal != creditsTotal){
            return this.props.alert.error('Debits Do Not Equal Credits');
        }
    }

    amountIsNumber(){
        let debits = this.state.debitEntries;
        for(let i = 0; i < debits.length; i++){
            if(isNaN(debits[i].amount)){
                // return this.props.alert.error("Amount Must Be A Number");
                return "Amount Must Be A Number";
            }
        }

        let credits = this.state.creditEntries;
        for(let i = 0; i < credits.length; i++){
            if(isNaN(credits[i].amount)){
                // return this.props.alert.error("Amount Must Be A Number");
                return "Amount Must Be A Number";
            }
        }
    }

    accountIsSelected(){
        let debits = this.state.debitEntries;
        for(let i = 0; i < debits.length; i++){
            if(debits[i].account == ""){
                // return this.props.alert.error("Account Cannot Be Blank");
                return "Account Cannot Be Blank";
            }
        }

        let credits = this.state.creditEntries;
        for(let i = 0; i < credits.length; i++){
            if(credits[i].account == ""){
                // return this.props.alert.error("Account Cannot Be Blank");
                return "Account Cannot Be Blance";
            }
        }
    }

    amountIsZero(){
        let debits = this.state.debitEntries;
        for(let i = 0; i < debits.length; i++){
            if(debits[i].amount == 0){
                // return this.props.alert.error("Amount Cannot Equal Zero");
                return "Amount Cannot Equal Zero";
            }
        }

        let credits = this.state.creditEntries;
        for(let i = 0; i < credits.length; i++){
            if(credits[i].amount == 0){
                // return this.props.alert.error("Amount Cannot Equal Zero");
                return "Amount Cannot Equal Zero";
            }
        }
    }

    duplicateAccounts(){
        let debits = this.state.debitEntries;
        for(let i = 0; i < debits.length; i++){
            for(let j = 1; i < debits.length; i++){
                if(debits[i].account == debits[j].account){
                    // return this.props.alert.error("Duplicate Accounts");
                    return "Duplicate Accounts";
                }
            }
        }
    }

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async onTestSubmit(e){
        e.preventDefault();

        let errors = [];
        let errorNum = 1;
        // if(this.duplicateAccounts()){
        //     errors.push(this.duplicateAccounts());
        //     // return;
        // }
        if(this.amountIsZero()){
            let error = {
                num: errorNum,
                error: this.amountIsZero()
            };
            errors.push(error);
            errorNum += 1;
            // errors.push(this.amountIsZero());
            // return;
        }
        if(this.accountIsSelected()){
            let error = {
                num: errorNum,
                error: this.accountIsSelected()
            };         
            errors.push(error);
            errorNum += 1;
            // errors.push(this.accountIsSelected());
            // return;
        }
        if(this.amountIsNumber()){
            let error = {
                num: errorNum,
                error: this.amountIsNumber()
            }
            errors.push(error);
            errorNum += 1;
            // errors.push(this.amountIsNumber());
            // return;
        }
        if(this.debitsEqualCredits()){
            let error = {
                num: errorNum,
                error: this.debitsEqualCredits()
            }
            errors.push(error);
            errorNum += 1;
            // errors.push(this.debitsEqualCredits());
            // return;
        }
        if(errors.length >= 1){
            console.log(errors);
            this.props.alert.error(<div>
                {errors.map(err => {
                    return(
                        <div style={{display: "block"}}>{err.num}. {err.error}</div>
                    ); 
                })}
            </div>);
        }

        var reader = new FileReader();

        if (this.state.file) {
          reader.readAsDataURL(this.state.file);
        }
        await this.sleep(2000);

        const debitEntries = this.formatEntries(this.state.debitEntries);
        const creditEntries = this.formatEntries(this.state.creditEntries);

        const newTransaction = {
            debitEntries: debitEntries,
            creditEntries: creditEntries,
            date: this.state.date.format("L").toString(),
            description: this.state.description,
            status: "pending",
            rejectReason: "",
            file: reader.result,
            fileName: reader.name,
            transactionType: this.state.transactionType 
        }

        this.createTransacton(newTransaction);
        return this.props.alert.success("Transaction Created");
        
        
        // window.location.reload();

        console.log(`NEW TRANSACTION: ${Object.entries(newTransaction).toString()}`);
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

    removeDebitTransactionEntry(id){
        const tempDebitEntries = this.state.debitEntries;
        console.log(`DEBIT ENTRIES LENGTH: ${tempDebitEntries.length}`);
        if(tempDebitEntries.length > 1){
            for(let i = 1; i < tempDebitEntries.length + 1; i++){
                if(id == tempDebitEntries[i].id){
                    tempDebitEntries.pop(tempDebitEntries[i]);
                }
            }

            this.setState({debitEntries: tempDebitEntries});
        }
    }

    removeCreditTransactionEntry(id){
        const tempCreditEntries = this.state.creditEntries;
        console.log(`CREDIT ENTRIES LENGTH: ${tempCreditEntries.length}`);
        if(tempCreditEntries.length > 1){
            for(let i = 1; i < tempCreditEntries.length + 1; i++){
                if(id == tempCreditEntries[i].id){
                    tempCreditEntries.pop(tempCreditEntries[i]);
                }
            }

            this.setState({creditEntries: tempCreditEntries});
        }
    }

    // LIFECYCLE METHODS
    componentDidMount() {
        fetch('/accounts')
            .then(res => res.json())
            .then(accounts => this.setState({ accounts: accounts }, () => console.log('Accounts fetched...', accounts)));
    }

    render() {
      const { redirect } = this.state;

      if (redirect) {
        return (
          <Redirect to="/transactions/view" />
        );
      }

        return (
            <div className="container mt-3">
                <div className="card">
                    <div className="card-header text-left">
                        <div className="row">
                            <div className="col-md-5">
                                <h2>New Transaction</h2>
                            </div>
                            <div className="col-md-2 ml-auto">
                                <select onChange={this.onTransactionTypeChange} value={this.state.transactionType} className="form-control">
                                    <option selected>REG</option>
                                    <option>AJE</option>
                                    <option>CJE</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onTestSubmit} className="m-auto">
                            <div className="row">
                                <div className="col-md-4 text-left">
                                    <div>
                                        <DatePicker
                                            selected={this.state.date}
                                            onChange={this.onDateChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <textarea onChange={this.onDescriptionChange} name="description" cols="25" rows="5" placeholder="Description" className="form-control" ref="description"></textarea>
                                    </div>
                                    <div className="mt-2">
                                        <input type="file" onChange={this.setFile} className="btn btn-primary mr-auto my-2"/>         
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div>
                                        {
                                            this.state.debitEntries.map(entry => {
                                                return(
                                                    <div className="row">
                                                        <div className="col-md-10">
                                                            <TransactionEntry id={this.state.debitEntries.length} sendEntryId={this.removeDebitTransactionEntry} sendAccount={this.getDebitData}
                                                            sendAmount={this.getDebitData} />
                                                        </div>
                                                        <div className="col-md-1">
                                                            <button onClick={this.addNewTransactionEntry} className="btn" value="debit">+</button>
                                                        </div>
                                                        <div className="col-md-1">
                                                            <button onClick={this.removeTransactionEntry} className="btn" value="debit">-</button>
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
                                                            <TransactionEntry id={this.state.creditEntries.length} sendEntryId={this.removeCreditTransactionEntry} sendAccount={this.getCreditData}
                                                            sendAmount={this.getCreditData} />
                                                        </div>
                                                        <div className="col-md-1">
                                                            <button onClick={this.addNewTransactionEntry} className="btn" value="credit">+</button>
                                                        </div>
                                                        <div className="col-md-1">
                                                            <button onClick={this.removeTransactionEntry} className="btn" value="credit">-</button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>                                
                                <div className="ml-auto my-2">
                                    <button onClick={this.onFormClear} className="btn btn-danger mr-2">Clear</button>
                                    <input type="submit" value="Submit" className="btn btn-primary" />
                                </div>                                           
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logAction: transactionOccured,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    log: state.log,
    auth: state.authentication
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withAlert(RecordTransactions));
