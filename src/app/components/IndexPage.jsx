import React from 'react';
import { Link } from 'react-router';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="home">
        <header>What are we doing?</header>
        <button><Link to='/sendmoney'>Send Money</Link></button>
        <button><Link to='/history'>View Transaction History</Link></button>
        <footer></footer>
      </div>
    );
  }
}
