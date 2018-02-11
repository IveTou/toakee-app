import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withApollo } from 'react-apollo';
import { sessionLogin } from '~/src/utils/session';
import { Modal, Fade, Paper, Icon, Typography } from 'material-ui-next';

import { closeAuthModal, goToLogin, goToSignUp } from '~/src/ducks/auth-modal';
import { alertGraphQLError } from '~/src/ducks/snackbar';

import { withIndexStyle } from './styles';
import Login from './login';
import SignUp from './sign-up';

const AuthModal = ({
  open,
  onClose,
  mode,
  client,
  onSuccess,
  onGoToLogin,
  onGoToSignUp,
  onGraphqlError,
  classes,
}) => {
  const [headerTitle, headerIcon] = {
    login: ['Entre com suas credenciais', 'account_circle'],
    signUp: ['Nova conta', 'person_add'],
  }[mode];

  const onLogin = (token) => {
    sessionLogin(token);
    client.resetStore();
    onClose();
    onSuccess();
  };

  return (
    <Modal open={open} onClose={onClose} disableAutoFocus>
      <Fade in={open}>
        <Paper classes={{ root: classes.root }}>
          <Paper classes={{ root: classes.header }}>
            <Icon className={classes.headerIcon}>{headerIcon}</Icon>
            <Typography variant="title" className={classes.headerTitle}>
              {headerTitle}
            </Typography>
          </Paper>
          <Choose>
            <When condition={mode === 'login'}>
              <Login
                onLogin={onLogin}
                onGraphqlError={onGraphqlError}
                onGoToSignUp={onGoToSignUp}
              />
            </When>
            <When condition={mode === 'signUp'}>
              <SignUp
                onLogin={onLogin}
                onGoToLogin={onGoToLogin}
                onGraphqlError={onGraphqlError}
              />
            </When>
          </Choose>
        </Paper>
      </Fade>
    </Modal>
  );
};

AuthModal.propTypes = {
  open: PropTypes.bool,
  mode: PropTypes.string,
  client: PropTypes.object,
  classes: PropTypes.object,
  onSuccess: PropTypes.func,
  onClose: PropTypes.func,
  onGoToLogin: PropTypes.func,
  onGoToSignUp: PropTypes.func,
  onGraphqlError: PropTypes.func,
};

const injectStore = connect(
  ({ authModal }) => authModal.toJS(),
  dispatch => ({
    onGraphqlError: error => dispatch(alertGraphQLError(error)),
    onClose: () => dispatch(closeAuthModal()),
    onGoToLogin: () => dispatch(goToLogin()),
    onGoToSignUp: () => dispatch(goToSignUp()),
  }),
);

export default compose(
  withApollo,
  injectStore,
  withIndexStyle,
)(AuthModal);
