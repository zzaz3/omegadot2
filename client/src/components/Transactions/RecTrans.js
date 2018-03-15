import React from 'react';
import ReactTable from 'react-table';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {withAlert} from 'react-alert';
import Dropzone from 'react-dropzone';

import 'react-datepicker/dist/react-datepicker.css';

class RecordTransactions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            accounts: [],
            date: moment(),
            selectedDebitAccount: 'None',
            selectedCreditAccount: 'None',
            ref: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.onAccountChange = this.onAccountChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.addDebit = this.addDebit.bind(this);
    }

    addDebit(e){
        e.preventDefault();
    }

    onAccountChange(e) {
        switch(e.target.name){
            case 'debitAccount':
                this.setState({selectedDebitAccount: e.target.value});
                break;
            case 'creditAccount':
                this.setState({selectedCreditAccount: e.target.value})
        }
      }

    handleChange(date){
        this.setState({date: date});
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
        
        if(this.state.selectedDebitAccount == 'None'){
            return this.props.alert.error('SELECT A DEBIT ACCOUNT');
        }
        if(this.state.selectedCreditAccount == 'None'){
            return this.props.alert.error('SELECT A CREDIT ACCOUNT');
        }

        if(Math.sign(this.refs.debitAmount.value) === -1 || isNaN(this.refs.debitAmount.value)) {
            return this.props.alert.error('INVALID DEBIT AMOUNT');
        }
        if(Math.sign(this.refs.creditAmount.value) === -1 || isNaN(this.refs.creditAmount.value)) {
            return this.props.alert.error('INVALID CREDIT AMOUNT');
        }

        const newTransaction = {
        debitAccount: this.state.selectedDebitAccount,
        debitAmount: this.refs.debitAmount.value,
        creditAccount: this.state.selectedCreditAccount,
        creditAmount: this.refs.creditAmount.value,
        description: this.refs.description.value,
        date: this.state.date.format('L').toString(),
        status: 'pending',
        ref: this.state.ref
        }
        this.createTransacton(newTransaction);
        this.setState({
            selectedDebitAccount: 'None',
            selectedCreditAccount: 'None',
            date: moment()
        });
        this.refs.debitAmount.value = '';
        this.refs.creditAmount.value = '';
        this.refs.description.value = '';
    }

    componentDidMount() {
        fetch('/accounts')
          .then(res => res.json())
          .then(accounts => this.setState({ accounts: accounts }, () => console.log('Accounts fetched...', accounts)));
      }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <DatePicker 
                            inline
                            selected={this.state.date}
                            onChange={this.handleChange}
                        />  
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="row form-group">
                            <div className="col-md-12">
                                <label htmlFor="debit">DEBIT</label>
                            </div>
                            <div className="col-md-12">
                                <select onChange={this.onAccountChange} value={this.state.selectedDebitAccount} className="form-control" name="debitAccount">
                                    <option value="None" selected>None</option>
                                    {this.state.accounts.map(account => <option>{account.name}</option>)}
                                </select>
                                <input type="text" placeholder="$0.00" ref="debitAmount" className="form-control"/>
                            </div>
                        </div>
                        <div className="row form-group">

                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row form-group">
                            <div className="col-md-6">
                                <textarea className="form-control" name="comments" ref="comments" cols="30" rows="10"></textarea>
                            </div>
                            <div className="col-md-6">
                                <Dropzone onDrop={this.onDrop}>
                                    <p>Click or Drag and Drop to Add Files</p>
                                </Dropzone>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withAlert(RecordTransactions);