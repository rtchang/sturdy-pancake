import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../app/routes';
import NotFoundPage from '../app/components/NotFoundPage';
import fs from "fs";
import configureStore from '../app/store/store';

const TRANSACTIONS_PER_PAGE = 20;

const transactions = {};
fs.readFile( __dirname + "/" + "transactions.json", 'utf8', function (err, data) {
  let transactionData = JSON.parse(data);
  transactionData = Object.keys(transactionData).map( k => {
    transactionData[k].id = k;
    return transactionData[k];
  });
  transactionData = transactionData.sort((a,b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  let currentPage = 0;
  for (let i = 0; i < transactionData.length; i += TRANSACTIONS_PER_PAGE) {
    transactions[currentPage] = transactionData.slice(i, i+TRANSACTIONS_PER_PAGE);
    currentPage++;
  }
});

const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(Express.static(path.join(__dirname, 'static')));

app.get('/api/transactions', function (req, res) {
  const transactionsPage = transactions[req.query.page];
  if (transactionsPage) {
   res.json(transactionsPage);
  }
});

app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {
      if (err) {
        return res.status(500).send(err.message);
      }

      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }
      const store = configureStore();
      let markup;
      let preloadedState;
      if (renderProps) {
        preloadedState = escape(JSON.stringify(store.getState()));
        const element = (
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        markup = renderToString(element);
      } else {
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }
      return res.render('index', { markup, preloadedState });
    }
  );
});

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
