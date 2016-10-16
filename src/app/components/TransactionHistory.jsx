import React from 'react';
import { Link } from 'react-router';

export default class TransactionHistory extends React.Component {

  componentDidMount() {
    this.props.requestTransactions(0);
  }

  render() {
    return (
      <div>
        Transaction History
      </div>
    );
  }
}
