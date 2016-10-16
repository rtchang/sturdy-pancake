import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './app/components/AppRoutes';
import { Provider } from 'react-redux';
import configureStore from './app/store/store';

let store = configureStore();

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppRoutes />,
    </Provider>,
    document.getElementById('main')
  );
});
