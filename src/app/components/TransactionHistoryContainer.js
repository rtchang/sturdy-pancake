import { connect } from 'react-redux';
import TransactionHistory from './TransactionHistory';

const mapStateToProps = state => ({
  transactions: state.transactions
});

export default connect(mapStateToProps,null)(TransactionHistory);
