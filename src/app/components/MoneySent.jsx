import React from 'react';
import { Link } from 'react-router';

const MoneySent = ({amount, email, currency, clearForm}) => (
  <div>
    <header>Send Money</header>
    <p>You have sent {amount} {currency} to {email}</p>
    <footer>
      <button onClick={clearForm}>Send Money</button>
      <Link to='/history'><button>View Transaction History</button></Link>
    </footer>
  </div>
);

export default MoneySent;
