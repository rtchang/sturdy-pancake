import { connect } from 'react-redux';
import TransactionHistory from './TransactionHistory';
import {requestTransactions} from '../actions/transaction_actions';

const mapStateToProps = state => ({
  transactions: state.transactions
});

const mapDispatchToProps = dispatch => ({
  requestTransactions: page => dispatch(requestTransactions(page))
});

export default connect(mapStateToProps,mapDispatchToProps)(TransactionHistory);
