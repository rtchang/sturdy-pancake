import { applyMiddleware } from 'redux';
import TransactionMiddleware from './transaction_middleware';
const RootMiddleware = applyMiddleware(
  TransactionMiddleware
);

export default RootMiddleware;
