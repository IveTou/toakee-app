import React from 'react';
import PropTypes from 'prop-types';
import { graphql, withApollo } from 'react-apollo';
import { compose } from 'recompose';
import { Formik } from 'formik';
import { Button } from 'material-ui';

import FormField from '~/src/components/form-field';
import SocialLoginButton from '~/src/components/social-login-button';
import { sessionSocialLogin } from '~/src/utils/session';
import { loginMutation, socialLoginMutation } from './graphql';
import { loginSchema } from './validation';
import { withLoginStyle } from './styles';

const AuthModalLogin = ({
  onSubmitLogin,
  onSubmitSocialLogin,
  onGraphqlError,
  onLogin,
  onGoToSignUp,
  classes,
}) => {
  const handleLoginSubmit = (values) =>
    onSubmitLogin(values)
      .then(({ data }) => onLogin(data.login))
      .catch(onGraphqlError);

  const handleSocialLoginSubmit = (socialToken) =>
    onSubmitSocialLogin(socialToken)
      .then(({ data }) => onLogin(data.socialLogin))
      .then(() => sessionSocialLogin('facebook', socialToken))
      .catch(onGraphqlError);

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={handleLoginSubmit}
      render={({ handleSubmit, handleChange, values, errors, touched }) => (
        <form onSubmit={handleSubmit} className={classes.form}>
          <FormField
            label="Usuário"
            icon="person"
            name="username"
            value={values.username}
            onChange={handleChange}
            margin="normal"
            error={touched.username && errors.username}
            fullWidth
          />
          <FormField
            label="Senha"
            icon="lock"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            margin="normal"
            error={touched.password && errors.password}
            fullWidth
          />
          <Button
            className={classes.formSubmitButton}
            type="submit"
            color="primary"
            variant="raised"
            fullWidth
          >
            Entrar
          </Button>
          <SocialLoginButton
            onReceiveToken={handleSocialLoginSubmit}
            network="facebook"
            material
          />
          <Button
            className={classes.formGoToSignUpButton}
            color="primary"
            fullWidth
            onClick={onGoToSignUp}
          >
            Não tenho cadastro
          </Button>
        </form>
      )}
    />
  );
};

AuthModalLogin.propTypes = {
  onSubmitLogin: PropTypes.func,
  onSubmitSocialLogin: PropTypes.func,
  onGraphqlError: PropTypes.func,
  onLogin: PropTypes.func,
  onGoToSignUp: PropTypes.func,
  classes: PropTypes.object,
};

const injectLoginMutation = graphql(loginMutation, {
  props: ({ mutate }) => ({
    onSubmitLogin: variables => mutate({ variables }),
  }),
});

const injectSocialLoginMutation = graphql(socialLoginMutation, {
  props: ({ mutate }) => ({
    onSubmitSocialLogin: token => mutate({
      variables: { token, network: 'FACEBOOK' },
    }),
  }),
});

export default compose(
  injectLoginMutation,
  injectSocialLoginMutation,
  withLoginStyle,
  withApollo,
)(AuthModalLogin);

