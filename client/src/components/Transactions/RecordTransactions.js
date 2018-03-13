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
            selectedCreditAccount: 'None'
        }

        this.handleChange = this.handleChange.bind(this);
        this.onAccountChange = this.onAccountChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
        date: this.state.date.toDate()
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
        return(
            <div>
                <button className="btn btn-primary" data-toggle="modal" data-target="#createTransactionModal">Create Transaction</button>
                
                <div className="modal" id="createTransactionModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Create Transaction</h4>
                                <button className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group row">
                                        <div className="col-md-6">
                                            <label htmlFor="transactionDate">DATE</label>
                                        </div>
                                        <div className="col-md-6">
                                            <DatePicker
                                                selected={this.state.date}
                                                onChange={this.handleChange}
                                                className="form-control"
                                            />                                            
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-6">
                                            <label htmlFor="debit">DEBIT</label>
                                        </div>
                                        <div className="col-md-6">
                                            <select onChange={this.onAccountChange} value={this.state.selectedDebitAccount} className="form-control" name="debitAccount">
                                                <option value="None" selected>None</option>
                                                {this.state.accounts.map(account => <option>{account.name}</option>)}
                                            </select>
                                            <p>{this.state.selectedDebitAccount}</p>
                                            <input type="text" placeholder="$0.00" ref="debitAmount" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-6">
                                            <label htmlFor="credit">CREDIT</label>
                                        </div>
                                        <div className="col-md-6">
                                            <select onChange={this.onAccountChange} value={this.state.selectedCreditAccount} className="form-control" name="creditAccount">
                                                <option value="None" selected>None</option>
                                                {this.state.accounts.map(account => <option>{account.name}</option>)}
                                            </select>
                                            <p>{this.state.selectedCreditAccount}</p>
                                            <input type="text" placeholder="$0.00" ref="creditAmount" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-6">
                                            <label htmlFor="description">DESCRIPTION</label>
                                        </div>
                                        <div className="col-md-6">
                                            <textarea name="description"cols="25" rows="5" className="form-control" ref="description"></textarea>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <input type="submit" value="Create" className="btn btn-primary"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withAlert(RecordTransactions);