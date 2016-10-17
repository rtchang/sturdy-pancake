import {receiveTransactions,TransactionConstants} from '../actions/transaction_actions';

export default ({getState, dispatch}) => next => action => {
  const success = transactions => dispatch(receiveTransactions(transactions));
  switch(action.type) {
    case TransactionConstants.REQUEST_TRANSACTIONS:
      const request = new XMLHttpRequest();
      request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {
            success(JSON.parse(request.responseText));
          } else {
            console.error("error requesting transactions");
          }
        }
      };
      request.open("GET", `/api/transactions?page=${action.page}`);
      request.send();
      return next(action);
    default:
      return next(action);
  }
};
