import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import {
  Router,
  browserHistory,
} from 'react-router';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import makeRoutes from '~/src/routes';
import rootReducer from '~/src/toakee-core/ducks';

if (process.env.BROWSER) {
  require('~/src/scss/base.scss');
  require('~/node_modules/include-media/dist/_include-media.scss');
  require('~/node_modules/material-design-lite/material.min.js');
  require('~/node_modules/slick-carousel/slick/slick.css');
}

moment.locale('pt-br');

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
)(createStore);

const app = (
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <Router history={browserHistory} routes={makeRoutes()} />
  </Provider>
);

render(app, document.getElementById('app'));
