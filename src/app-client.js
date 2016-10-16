import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<AppRoutes />, document.getElementById('main'));
});
