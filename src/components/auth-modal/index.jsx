import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withApollo } from 'react-apollo';
import { sessionLogin } from '~/src/utils/session';
import { Modal, Fade, Paper, Typography } from 'material-ui';

import { closeAuthModal, goToLogin, goToSignUp } from '~/src/ducks/auth-modal';
import Logo from '~/src/components/logo';
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
  const headerTitle = {
    login: 'Entre no Toakee',
    signUp: 'Cadastre-se no Toakee',
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
          <div className={classes.header}>
            <Logo compact size={72} />
            <Typography variant="headline" className={classes.headerTitle}>{headerTitle}</Typography>
          </div>
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
