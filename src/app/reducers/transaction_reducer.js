import merge from 'lodash/merge';

const TransactionReducer = function(state = [], action){
  let newState = merge({},state);
  switch(action.type){
    default:
      return state;
  }
};

export default TransactionReducer;
