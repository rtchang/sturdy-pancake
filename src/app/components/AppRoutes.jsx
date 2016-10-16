import React from 'react';
import { Router, browserHistory } from 'react-router';
import getRoutes from '../routes';

const routes = getRoutes();

class AppRoutes extends React.Component {
  render() {
    return (
      <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
    );
  }
}

AppRoutes.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default AppRoutes;
