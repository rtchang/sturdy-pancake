import React from 'react';
import ReactDOM from 'react-dom';
import Root from './app/components/Root';

import configureStore from './app/store/store';

let store = configureStore();

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Root store={store} />,
    document.getElementById('main')
  );
});
