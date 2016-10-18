import React from 'react';

export default class TransactionItem extends React.Component {

  render() {
    const transaction = this.props.transaction;
    const date = transaction.date;
    return (
      <li className="transaction">
        <p className="transaction-date">
          {`${date.slice(5,10)}/${date.slice(0,4)}`}
        </p>
        <p className="transaction-name">{transaction.name}</p>
        <p className="transaction-amount">${transaction.amount}</p>
      </li>
    );
  }
}
