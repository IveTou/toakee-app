import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from '~/src/routes/protected';

import NewEventPage from '~/src/pages/new-event';
import EventPage from '~/src/pages/event';
import EventPhotos from '~/src/pages/event-photos';
import EventFeed from '~/src/pages/event-feed';
import SearchPage from '~/src/pages/search';
import Landing from '~/src/pages/landing';
import Dashboard from '~/src/pages/dashboard';
import UseTerms from '~/src/pages/use-terms';
import About from '~/src/pages/about';
import EventModeration from '~/src/pages/event-moderation';

import Login from '~/src/components/auth-wrapper/login';
import SignUp from '~/src/components/auth-wrapper/sign-up';
import Scroller from '~/src/components/scroller';
import Snackbar from '~/src/components/snackbar';

import ViewerProvider from '~/src/components/viewer-provider';
import DeviceInfoProvider from '~/src/components/device-info-provider';

import { userIsLogged, userIsAdmin } from '~/src/auth';

const App = ({ userAgent }) => (
  <ViewerProvider>
    <DeviceInfoProvider userAgent={userAgent || window.navigator.userAgent}>
      <Scroller />
      <Snackbar />
      <Switch>
        <ProtectedRoute
          auth={userIsLogged}
          component={EventFeed}
          path="/"
          redirectTo="/landing"
          exact
        />
        <ProtectedRoute
          auth={userIsAdmin}
          component={EventModeration}
          path="/moderacao"
          redirectTo="/login"
          exact
        />
        <Route path="/landing" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/cadastrar" component={SignUp} />
        <Route path="/search" component={SearchPage} />
        <Route path="/evento/novo" exact component={NewEventPage} />
        <Route path="/evento/:slug" exact component={EventPage} />
        <Route path="/evento/:slug/fotos" component={EventPhotos} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/termos-de-uso" component={UseTerms} />
        <Route path="/quem-somos" component={About} />
      </Switch>
    </DeviceInfoProvider>
  </ViewerProvider>
);

App.propTypes = {
  userAgent: PropTypes.string,
};

export default App;
