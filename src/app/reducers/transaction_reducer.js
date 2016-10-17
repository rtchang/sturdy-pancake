import merge from 'lodash/merge';
import {TransactionConstants} from '../actions/transaction_actions';

const TransactionReducer = function(state = [], action){
  switch(action.type){
    case TransactionConstants.RECEIVE_TRANSACTIONS:
      const newState = state.concat(action.transactions);
      return newState;
    default:
      return state;
  }
};

export default TransactionReducer;
