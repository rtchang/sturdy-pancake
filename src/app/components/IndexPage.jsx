import React from 'react';
import { Link } from 'react-router';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="home">
        <header>What are we doing?</header>
        <Link to='/sendmoney'><button>Send Money</button></Link>
        <Link to='/history'><button>View Transaction History</button></Link>
        <footer></footer>
      </div>
    );
  }
}
