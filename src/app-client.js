import React from 'react';
import ReactDOM from 'react-dom';
import Root from './app/components/Root';

import configureStore from './app/store/store';

const preloadedState = JSON.parse(unescape(window.__PRELOADED_STATE__));

const store = configureStore(preloadedState);
window.store = store;
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Root store={store} />,
    document.getElementById('main')
  );
});
