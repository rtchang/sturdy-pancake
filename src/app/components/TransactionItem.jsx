import React from 'react';

export default class TransactionItem extends React.Component {

  render() {
    const transaction = this.props.transaction;
    const date = transaction.date;
    return (
      <li className="transaction">
        <p>{`${date.slice(5,10)}/${date.slice(0,4)}`}</p>
        <p>{transaction.name}</p>
        <p>${transaction.amount}</p>
      </li>
    );
  }
}
