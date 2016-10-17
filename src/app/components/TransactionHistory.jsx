import React from 'react';
import { Link } from 'react-router';
import TransactionItem from './TransactionItem';
import { throttle } from 'lodash';

export default class TransactionHistory extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = throttle(this.handleScroll.bind(this),500);
  }

  componentDidMount() {
    const transactions = this.props.transactions;
    if (!transactions || transactions.length === 0) {
      this.props.requestTransactions(0);
    }
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate() {
    const getMoreTransactions = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    if (getMoreTransactions) {
      this.props.requestTransactions((this.props.transactions.length / 20));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
      this.props.requestTransactions((this.props.transactions.length / 20));
    }
  }

  render() {
    const transactions = this.props.transactions.map( transaction => {
      return <TransactionItem key={transaction.id} transaction={transaction}/>;
    });
    return (
      <div>
        <header>Transaction History</header>
        <ul>{transactions}</ul>
        <footer><Link to='/'><button>Back</button></Link></footer>
      </div>
    );
  }
}
