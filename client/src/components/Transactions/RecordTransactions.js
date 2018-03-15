import React from 'react';
import ReactTable from 'react-table';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { withAlert } from 'react-alert';
import Dropzone from 'react-dropzone';

import 'react-datepicker/dist/react-datepicker.css';

class RecordTransactions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            files: [],
            date: moment(),
            selectedDebitAccount: 'None',
            selectedCreditAccount: 'None',
            debitRefNum: '',
            creditRefNum: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.onAccountChange = this.onAccountChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleRefChange = this.handleRefChange.bind(this);
        this.handleDebitRefNumChange = this.handleDebitRefNumChange.bind(this);
        this.handleCreditRefNumChange = this.handleCreditRefNumChange.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(file) {
        this.setState({
            files: this.state.files.concat(file)
        });
    }

    onAccountChange(e) {
        switch (e.target.name) {
            case 'debitAccount':
                this.setState({ selectedDebitAccount: e.target.value });
                break;
            case 'creditAccount':
                this.setState({ selectedCreditAccount: e.target.value })
        }
    }

    handleChange(date) {
        this.setState({ date: date });
    }

    handleRefChange(e) {
        this.setState({ ref: e.target.value });
    }

    handleDebitRefNumChange(e) {
        this.setState({ debitRefNum: e.target.value });
    }

    handleCreditRefNumChange(e) {
        this.setState({ creditRefNum: e.target.value });
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

        if (this.state.selectedDebitAccount == 'None') {
            return this.props.alert.error('SELECT A DEBIT ACCOUNT');
        }
        if (this.state.selectedCreditAccount == 'None') {
            return this.props.alert.error('SELECT A CREDIT ACCOUNT');
        }

        if (Math.sign(this.refs.debitAmount.value) === -1 || isNaN(this.refs.debitAmount.value)) {
            return this.props.alert.error('INVALID DEBIT AMOUNT');
        }
        if (Math.sign(this.refs.creditAmount.value) === -1 || isNaN(this.refs.creditAmount.value)) {
            return this.props.alert.error('INVALID CREDIT AMOUNT');
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

    componentDidMount() {
        fetch('/accounts')
            .then(res => res.json())
            .then(accounts => this.setState({ accounts: accounts }, () => console.log('Accounts fetched...', accounts)));
    }

    render() {
        return (
            <div className="container mt-3">
                <form onSubmit={this.onSubmit} className="m-auto">
                    <div className="row">
                        <div className="col-md-2">
                            <label htmlFor="debit">Debit</label>
                            <select onChange={this.onAccountChange} value={this.state.selectedDebitAccount} className="form-control" name="debitAccount">
                            <option value="None" selected>None</option>
                            {this.state.accounts.map(account => <option>{account.name}</option>)}
                            </select>
                            <input type="text" className="my-2" placeholder="ref #" onChange={this.handleDebitRefNumChange} value={this.state.debitRefNum} className="form-control" />
                            <input type="text" placeholder="$0.00" ref="debitAmount" className="form-control" />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="credit">Credit</label>
                            <select onChange={this.onAccountChange} value={this.state.selectedCreditAccount} className="form-control" name="creditAccount">
                            <option value="None" selected>None</option>
                            {this.state.accounts.map(account => <option>{account.name}</option>)}
                            </select>
                            <input type="text" className="mt-5" placeholder="ref #" onChange={this.handleCreditRefNumChange} value={this.state.creditRefNum} className="form-control" />
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