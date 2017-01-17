import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { getToken } from '~/src/utils/session';
import Unlogged from '~/src/pages/Unlogged';
import Landing from '~/src/components/Landing';

const loggedRoutes = null;

const unloggedRoutes = (
  <Route path="/" component={Unlogged} >
    <IndexRoute component={Landing} />
  </Route>
);

export default () => (getToken() ? loggedRoutes : unloggedRoutes);
