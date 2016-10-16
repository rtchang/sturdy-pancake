import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import NotFoundPage from './components/NotFoundPage';
import SendMoney from './components/SendMoney';
import TransactionHistoryContainer from './components/TransactionHistoryContainer';



const routes = function(store) {
  const requestTransactions = function requestTransactions() {

  };
  return (
    <Route path="/" component={Layout}>
      <IndexRoute component={IndexPage}/>
      <Route path="/sendmoney" component={SendMoney}/>
      <Route path="/history" component={TransactionHistoryContainer} onEnter={requestTransactions}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  );
};

export default routes;
