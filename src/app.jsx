import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui';

import ProtectedRoute from '~/src/routes/protected';
import DefaultLayout from '~/src/layouts/default';

import NewEventPage from '~/src/pages/new-event';
import EditEventPage from '~/src/pages/edit-event';
import EventPage from '~/src/pages/event';
import EventFeed from '~/src/pages/event-feed';
import SearchPage from '~/src/pages/search';
import Dashboard from '~/src/pages/dashboard';
import UseTerms from '~/src/pages/use-terms';
import About from '~/src/pages/about';
import EventModeration from '~/src/pages/event-moderation';

import ContextProvider from '~/src/components/context-provider';
import Scroller from '~/src/components/scroller';
import Snackbar from '~/src/components/snackbar';
import AuthModal from '~/src/components/auth-modal';

import { userIsLogged, userIsAdmin } from '~/src/auth';

import { theme } from '~/src/mui/theme';

const App = ({ userAgent }) => (
  <MuiThemeProvider theme={theme}>
    <ContextProvider userAgent={userAgent || window.navigator.userAgent}>
      <Scroller />
      <Snackbar />
      <AuthModal />
      <DefaultLayout>
        <Switch>
          <ProtectedRoute
            auth={userIsAdmin}
            component={EventModeration}
            path="/moderacao"
            redirectTo="/login"
            exact
          />
          <ProtectedRoute
            auth={userIsLogged}
            component={NewEventPage}
            path="/evento/novo"
            redirectTo="/login"
            exact
          />
          <ProtectedRoute
            auth={userIsLogged}
            component={EditEventPage}
            path="/evento/:id/editar"
            redirectTo="/login"
            exact
          />
          <Route path="/" exact component={EventFeed} />
          <Route path="/search" component={SearchPage} />
          <Route path="/evento/:id" exact component={EventPage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/termos-de-uso" component={UseTerms} />
          <Route path="/quem-somos" component={About} />
        </Switch>
      </DefaultLayout>
    </ContextProvider>
  </MuiThemeProvider>
);

App.propTypes = {
  userAgent: PropTypes.string,
};

export default App;
