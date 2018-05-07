import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui';

import ProtectedRoute from '~/src/routes/protected';
import LayoutRoute from '~/src/routes/layout';

import NewEventPage from '~/src/pages/new-event';
import EditEventPage from '~/src/pages/edit-event';
import EventPage from '~/src/pages/event';
import EventFeed from '~/src/pages/event-feed';
import SearchPage from '~/src/pages/search';
import UseTerms from '~/src/pages/use-terms';
import Privacy from '~/src/pages/privacy';
import About from '~/src/pages/about';
import EventModeration from '~/src/pages/event-moderation';
import PendingGuests from '~/src/pages/pending-guests';

import ContextProvider from '~/src/components/context-provider';
import Snackbar from '~/src/components/snackbar';
import AuthModal from '~/src/components/auth-modal';

import { userIsLogged, userIsAdmin } from '~/src/auth';

import { theme } from '~/src/mui/theme';

const App = ({ userAgent }) => (
  <MuiThemeProvider theme={theme}>
    <ContextProvider userAgent={userAgent || window.navigator.userAgent}>
      <Snackbar />
      <AuthModal />
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
        <ProtectedRoute
          auth={userIsLogged}
          component={PendingGuests}
          path="/listas"
          redirectTo="/"
        />
        <LayoutRoute path="/" exact component={EventFeed} />
        <LayoutRoute path="/search" component={SearchPage} />
        <LayoutRoute path="/evento/:id" exact component={EventPage} />
        <LayoutRoute path="/termos-de-uso" component={UseTerms} />
        <LayoutRoute path="/quem-somos" component={About} />
        <LayoutRoute path="/privacidade" component={Privacy} />
      </Switch>
    </ContextProvider>
  </MuiThemeProvider>
);

App.propTypes = {
  userAgent: PropTypes.string,
};

export default App;
