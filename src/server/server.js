import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import getRoutes from '../app/routes';
import NotFoundPage from '../app/components/NotFoundPage';
import fs from "fs";
import configureStore from '../app/store/store';

const TRANSACTIONS_PER_PAGE = 10;

const transactions = {};
fs.readFile( __dirname + "/" + "transactions.json", 'utf8', function (err, data) {
  let transactionData = JSON.parse(data);
  transactionData = Object.keys(transactionData).map( (k) => transactionData[k] );
  let currentPage = 0;
  for (let i = 0; i < transactionData.length; i += TRANSACTIONS_PER_PAGE) {
    transactions[currentPage] = transactionData.slice(i, i+TRANSACTIONS_PER_PAGE);
    currentPage++;
  }
});

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

app.get('/api/transactions', function (req, res) {
   res.json(transactions[req.query.page]);
});

// universal routing and rendering
const store = configureStore();
app.get('*', (req, res) => {
  match(
    { routes: getRoutes(store), location: req.url },
    (err, redirectLocation, renderProps) => {
      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }
      // generate the React markup for the current route
      let markup;
      let preloadedState;
      if (renderProps) {
        preloadedState = escape(JSON.stringify(store.getState()));
        const element = (
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        // if the current route matched we have renderProps
        markup = renderToString(element);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup, preloadedState });
    }
  );
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
