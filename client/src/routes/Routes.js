import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../components/Home';
import Charts from '../components/Charts';
import Accounts from '../components/Accounts';
import AddAccount from '../components/AddAccount';
import ViewTransactions from '../components/Transactions/ViewTransactions';
import RecordTransactions from '../components/Transactions/RecordTransactions';
import ReviewTransactions from '../components/Transactions/ReviewTransactions';
import Balance from '../components/Balance';
import LoginContainer from '../components/Login/LoginContainer';
import Team from '../components/Team';
import Register from '../components/Register';
import Log from '../components/Log';
import Journalize from '../components/Journalize';

import UnadjustedTrialBalance from '../components/Reports/UnadjustedTrialBalance';
import AdjustedTrialBalance from '../components/Reports/AdjustedTrialBalance';
import ClosingTrialBalance from '../components/Reports/ClosingTrialBalance';
import IncomeStatement from '../components/Reports/IncomeStatement';
import RetainedEarnings from '../components/Reports/RetainedEarnings';
import BalanceSheet from '../components/Reports/BalanceSheet';

import CashLedger from '../components/AccountLedgers/Cash';
import AccountsReceivableLedger from '../components/AccountLedgers/AccountsReceivable';
import PrepaidRentLedger from '../components/AccountLedgers/PrepaidRent';
import PrepaidInsuranceLedger from '../components/AccountLedgers/PrepaidInsurance';
import SuppliesLedger from '../components/AccountLedgers/Supplies';
import OfficeEquipmentLedger from '../components/AccountLedgers/OfficeEquipment';
import AccumulatedDepreciationLedger from '../components/AccountLedgers/AccumulatedDepreciation';
import AccountsPayableLedger from '../components/AccountLedgers/AccountPayable';
import SalariesPayableLedger from '../components/AccountLedgers/SalariesPayable';
import UnearnedRevenueLedger from '../components/AccountLedgers/UnearnedRevenue';
import ContributedCapitalLedger from '../components/AccountLedgers/ContributedCapital';
import RetainedEarningsLedger from '../components/AccountLedgers/RetainedEarnings';
import ServiceRevenueLedger from '../components/AccountLedgers/ServiceRevenue';
import InsuranceExpenseLedger from '../components/AccountLedgers/InsuranceExpense';
import DepreciationExpenseLedger from '../components/AccountLedgers/DepreciationExpense';
import RentExpenseLedger from '../components/AccountLedgers/RentExpense';
import SuppliesExpenseLedger from '../components/AccountLedgers/SuppliesExpense';
import SalariesExpenseLedger from '../components/AccountLedgers/SalariesExpense';
import TelephoneExpenseLedger from '../components/AccountLedgers/TelephoneExpense';
import UtilitiesExpenseLedger from '../components/AccountLedgers/UtilitiesExpense';
import AdvertisingExpenseLedger from '../components/AccountLedgers/AdvertisingExpense';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" exact={true} component={Home} />
      <Route exact path="/accounts" component={Accounts} />
      <Route exact path="/charts" component={Charts} />
      <Route exact path="/accounts/add" component={AddAccount} />
      <Route exact path="/journalize" component={Journalize} />
      <Route exact path="/transactions/view" component={ViewTransactions} />
      <Route exact path="/transactions/record" component={RecordTransactions} />
      <Route exact path="/transactions/review" component={ReviewTransactions} />
      <Route exact path="/login" component={LoginContainer} />
      <Route exact path="/team" component={Team} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/log" component={Log} />

      {/* REPORTS */}
      <Route exact path="/reports/unadjustedtrialbalance" component={UnadjustedTrialBalance} />
      <Route exact path="/reports/adjustedtrialbalance" component={AdjustedTrialBalance} />
      <Route exact path="/reports/closingtrialbalance" component={ClosingTrialBalance} />
      <Route exact path="/reports/incomestatement" component={IncomeStatement} />
      <Route exact path="/reports/retainedearnings" component={RetainedEarnings} />
      <Route exact path="/reports/balancesheet" component={BalanceSheet} />


      {/* LEDGERS */}
      <Route exact path="/accounts/cash" component={CashLedger}/>
      <Route exact path="/accounts/accountsreceivable" component={AccountsReceivableLedger}/>
      <Route exact path="/accounts/prepaidrent" component={PrepaidRentLedger}/>
      <Route exact path="/accounts/prepaidinsurance" component={PrepaidInsuranceLedger}/>
      <Route exact path="/accounts/supplies" component={SuppliesLedger}/>
      <Route exact path="/accounts/officeequipment" component={OfficeEquipmentLedger}/>
      <Route exact path="/accounts/accumulateddepreciation" component={AccumulatedDepreciationLedger}/>
      <Route exact path="/accounts/accountspayable" component={AccountsPayableLedger}/>
      <Route exact path="/accounts/salariespayable" component={SalariesPayableLedger}/>
      <Route exact path="/accounts/unearnedrevenue" component={UnearnedRevenueLedger}/>
      <Route exact path="/accounts/contributedcapital" component={ContributedCapitalLedger}/>
      <Route exact path="/accounts/retainedearnings" component={RetainedEarningsLedger}/>
      <Route exact path="/accounts/servicerevenue" component={ServiceRevenueLedger}/>
      <Route exact path="/accounts/insuranceexpense" component={InsuranceExpenseLedger}/>
      <Route exact path="/accounts/depreciationexpense" component={DepreciationExpenseLedger}/>
      <Route exact path="/accounts/rentexpense" component={RentExpenseLedger}/>
      <Route exact path="/accounts/suppliesexpense" component={SuppliesExpenseLedger}/>
      <Route exact path="/accounts/salariesexpense" component={SalariesExpenseLedger}/>
      <Route exact path="/accounts/telephoneexpense" component={TelephoneExpenseLedger}/>
      <Route exact path="/accounts/utilitiesexpense" component={UtilitiesExpenseLedger}/>
      <Route exact path="/accounts/advertisingexpense" component={AdvertisingExpenseLedger}/>

    </Switch>
  )
}

export default Routes;
