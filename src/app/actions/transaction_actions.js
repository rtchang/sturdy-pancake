export const TransactionConstants = {
  REQUEST_TRANSACTIONS: "REQUEST_TRANSACTIONS",
  RECEIVE_TRANSACTIONS: "RECEIVE_TRANSACTIONS",
};

export const requestTransactions = page => ({
  type: TransactionConstants.REQUEST_TRANSACTIONS,
  page
});


export const receiveTransactions = transactions => ({
  type: TransactionConstants.RECEIVE_TRANSACTIONS,
  transactions
});
