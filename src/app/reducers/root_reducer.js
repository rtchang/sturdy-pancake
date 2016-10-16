import {combineReducers} from 'redux';
import TransactionReducer from './transaction_reducer';
const RootReducer = combineReducers({
  transactions: TransactionReducer
});

export default RootReducer;
