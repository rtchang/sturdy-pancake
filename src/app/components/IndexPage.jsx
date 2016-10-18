import React from 'react';
import { Link } from 'react-router';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="home">
        <header><p className="header-text">What are we doing?</p></header>
        <Link to='/sendmoney' className="button index" tabIndex="-1">
          <button className="button index" tabIndex="1">Send Money</button>
        </Link>
        <Link to='/history' className="button index" tabIndex="-1">
          <button className="button index" tabIndex="2">View Transaction History</button>
        </Link>
        <footer></footer>
      </div>
    );
  }
}
