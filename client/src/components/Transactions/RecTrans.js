import React from 'react';
import ReactTable from 'react-table';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {withAlert} from 'react-alert';

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
                    <div className="col-md-5">
                        <div className="row">
                            <div className="col-md-2">
                                <button className="btn btn-primary">Add</button>
                            </div>
                            <div className="col-md-6 text-left">
                                <label htmlFor="debits">Debit(s):</label>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <select onChange={this.onAccountChange} value={this.state.selectedDebitAccount} className="form-control" name="debitAccount">
                                        <option value="None" selected>None</option>
                                        {this.state.accounts.map(account => <option>{account.name}</option>)}
                                </select>
                                <input type="text" placeholder="$0.00" ref="debitAmount" className="form-control mt-2"/>
                            </div>
                            <div className="col-md-2">
                                <input type="text" placeholder="Ref #" ref="referenceNum" className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="row">
                            <label htmlFor="credits">Credit(s)</label>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="comments">Comments:</label>
                                <textarea name="comments" id="comments" cols="30" rows="10"></textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="attachments">Attachments:</label>
                                <button className="btn btn-primary" disabled="disabled">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withAlert(RecordTransactions);