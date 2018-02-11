import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import {
  Button, Icon, Typography, InputAdornment, IconButton,
} from 'material-ui-next';

import FormField from '~/src/components/form-field';

import { signUpMutation } from './graphql';
import { withSignUpStyle } from './styles';
import { signUpSchema } from './validation';

const AuthModalSignUp = ({
  onLogin,
  onGoToLogin,
  onGraphqlError,
  onSubmitSignUp,
  classes,
}) => (
  <Formik
    initialValues={{
      firstName: '', lastName: '', username: '', email: '', password: '',
      passwordVisible: false,
    }}
    onSubmit={values => onSubmitSignUp(values)
      .then(({ data }) => onLogin(data.signUp))
      .catch(onGraphqlError)
    }
    validationSchema={signUpSchema}
    render={({ handleSubmit, handleChange, setFieldValue, values, errors, touched }) => (
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.formNameField}>
          <FormField
            label="Nome"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            error={touched.firstName && errors.firstName}
          />
          <FormField
            label="Sobrenome"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            error={touched.lastName && errors.lastName}
          />
        </div>
        <FormField
          label="Usuário"
          name="username"
          value={values.username}
          onChange={handleChange}
          error={touched.username && errors.username}
          fullWidth
        />
        <FormField
          label="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={touched.email && errors.email}
          fullWidth
        />
        <FormField
          label="Senha"
          type={values.passwordVisible ? 'text' : 'password'}
          name="password"
          value={values.password}
          onChange={handleChange}
          error={touched.password && errors.password}
          fullWidth
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setFieldValue('passwordVisible', !values.passwordVisible)}
              >
                <Icon>
                  {values.passwordVisible ? 'visibility' : 'visibility_off'}
                </Icon>
              </IconButton>
            </InputAdornment>
          }
        />
        <Button
          className={classes.formSubmitButton}
          type="submit"
          color="primary"
          variant="raised"
          fullWidth
        >
          Cadastrar
        </Button>
        <Typography variant="caption" align="center">
          Ao criar uma conta, você está concordando com os nossos<br />
          <Link to="/termos-de-uso" target="_blank">Termos de Uso</Link>.
        </Typography>
        <Button
          className={classes.formGoToLoginButton}
          color="primary"
          onClick={onGoToLogin}
          fullWidth
        >
          Já sou cadastrado
        </Button>
      </form>
    )}
  />
);

AuthModalSignUp.propTypes = {
  onLogin: PropTypes.func,
  onGoToLogin: PropTypes.func,
  onGraphqlError: PropTypes.func,
  onSubmitSignUp: PropTypes.func,
  classes: PropTypes.object,
};

const injectSignUpMutation = graphql(signUpMutation, {
  props: ({ mutate }) => ({
    onSubmitSignUp: variables => mutate({ variables }),
  }),
});

export default compose(
  injectSignUpMutation,
  withSignUpStyle,
)(AuthModalSignUp);

