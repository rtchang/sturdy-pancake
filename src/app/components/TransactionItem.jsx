import React from 'react';

export default class TransactionItem extends React.Component {

  render() {
    const transaction = this.props.transaction;
    return (
      <li>
        <p>{transaction.date.slice(0,10)}</p>
        <p>{transaction.name}</p>
        <p>${transaction.amount}</p>
      </li>
    );
  }
}
