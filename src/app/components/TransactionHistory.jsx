import React from 'react';
import { Link } from 'react-router';
import TransactionItem from './TransactionItem';
import { throttle } from 'lodash';

export default class TransactionHistory extends React.Component {
  constructor() {
    super();
    this.handleScroll = throttle(this.handleScroll.bind(this),500);
  }

  componentDidMount() {
    const transactions = this.props.transactions;
    if (!transactions || transactions.length === 0) {
      this.props.requestTransactions(0);
      this.props.requestTransactions(1);
    }
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate() {
    const getMoreTransactions = (window.innerHeight + window.scrollY) >= document.body.scrollHeight;
    if (getMoreTransactions) {
      this.props.requestTransactions((this.props.transactions.length / 20));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 100) {
      this.props.requestTransactions((this.props.transactions.length / 20));
    }
  }

  render() {
    const transactions = this.props.transactions.map( transaction => {
      return <TransactionItem key={transaction.id} transaction={transaction}/>;
    });
    return (
      <div className="home">
        <header><p className="header-text">Transaction History</p></header>
        <ul className="transactions">{transactions}</ul>
        <footer>
          <Link to='/' className="transaction" tabIndex="-1">
            <button className="transaction button">Back</button>
          </Link>
        </footer>
      </div>
    );
  }
}
