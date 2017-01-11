/* Entry point */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Home from './pages/Home';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={props => props.children}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
);

render(routes, document.getElementById('app'));