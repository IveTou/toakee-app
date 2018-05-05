import React from 'react';
import { render } from 'react-dom';
import moment from 'moment-timezone';
import { createBrowserHistory } from 'history';

import { Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '~/src/ducks';

import apolloClient from './apollo';
import App from './app';

if (process.env.BROWSER) {
  require('~/src/scss/base.scss');
  require('react-rte/lib/RichTextEditor.css');
}

moment.locale('pt-br');
moment.tz.setDefault('America/Bahia');

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
)(createStore);

const reduxStore = createStoreWithMiddleware(rootReducer);

const app = (
  <Provider store={reduxStore}>
    <ApolloProvider store={reduxStore} client={apolloClient}>
      <Router history={createBrowserHistory()}>
        <App />
      </Router>
    </ApolloProvider>
  </Provider>
);

render(app, document.getElementById('app'), () => {
  const jssStyles = document.getElementById('jss-ssr');
  jssStyles.parentNode.removeChild(jssStyles);
});
