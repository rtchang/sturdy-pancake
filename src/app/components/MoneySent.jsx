import React from 'react';
import { Link } from 'react-router';

const MoneySent = ({amount, email, currency, clearForm}) => (
  <div className="home">
    <header><p className="header-text">Send Money</p></header>
    <p className="sent-text">You have sent {amount} {currency} to {email}!</p>
    <p className="sent-checkmark">✓</p>
    <footer>
      <div className="footer">
        <button className="button sent-left" onClick={clearForm}>Send Money</button>
        <Link className="sent-money" to='/history'>
          <button className="button sent-right">Transaction History</button>
        </Link>
      </div>
    </footer>
  </div>
);

export default MoneySent;
