import React, { PropTypes } from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { partial, upperCase, pick } from 'lodash';
import autoBind from 'react-autobind';
import { Form, Divider, Popup, Icon } from 'semantic-ui-react';

import { alertGraphQLError } from '~/src/ducks/snackbar';
import SocialLoginButton from '~/src/components/social-login-button';

import { setToken, setSocialToken } from '~/src/utils/session';

import { validateLogin } from './validation';
import { loginMutation, socialLoginMutation } from './graphql';

if (process.env.BROWSER) {
  require('./style.scss');
}

export class Login extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = { username: '', password: '', errors: {} };
  }

  onChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  onSuccess(mutation, response) {
    setToken(response.data[mutation]);
    this.props.router.push('/redirect');
  }

  submit(e) {
    e.preventDefault();

    const form = pick(this.state, ['username', 'password']);
    const errors = validateLogin(form);
    this.setState({ errors: errors || {} });

    if (!errors) {
      this.props.login(form)
        .then(partial(this.onSuccess, 'login'))
        .catch(this.props.alert);
    }
  }

  socialSubmit(network, token) {
    setSocialToken(network, token);

    this.props.socialLogin({ network: upperCase(network), token })
      .then(partial(this.onSuccess, 'socialLogin'))
      .catch(this.props.alert);
  }

  renderErrorIcon(input) {
    const { [input]: errors } = this.state.errors;

    return errors && (
      <Popup
        trigger={<Icon link name="warning" color="red" />}
        content={errors[0]}
        position="top center"
        hideOnScroll
      />
    );
  }

  render() {
    const { username, password } = this.state;

    return (
      <div className="Login">
        <Divider horizontal>Entre com</Divider>
        <div className="Login-social">
          <SocialLoginButton network="facebook" onReceiveToken={this.socialSubmit} />
        </div>
        <Divider horizontal>ou</Divider>
        <Form>
          <Form.Input
            type="email"
            name="username"
            placeholder="Usuário"
            onChange={this.onChange}
            value={username}
            icon={this.renderErrorIcon('username')}
            error={!!this.state.errors.username}
          />
          <Form.Input
            type="password"
            name="password"
            placeholder="Senha"
            onChange={this.onChange}
            value={password}
            icon={this.renderErrorIcon('password')}
            error={!!this.state.errors.password}
          />
          <Form.Button color="orange" onClick={this.submit} fluid>
            Entrar
          </Form.Button>
          <Link className="AuthWrapper-link" to={{ pathname: '/cadastrar' }}>
            Não tenho cadastro
          </Link>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
  socialLogin: PropTypes.func,
  alert: PropTypes.func,
  router: PropTypes.object,
};

Login.defaultProps = {
  router: {},
};

const injectLoginMutation = graphql(loginMutation, {
  props: ({ mutate }) => ({
    login: variables => mutate({ variables }),
  }),
});

const injectSocialLoginMutation = graphql(socialLoginMutation, {
  props: ({ mutate }) => ({
    socialLogin: variables => mutate({ variables }),
  }),
});

const LoginWithData = compose(
  injectLoginMutation,
  injectSocialLoginMutation,
)(Login);

export default connect(
  () => ({}),
  dispatch => ({
    alert: error => dispatch(alertGraphQLError(error)),
  }),
)(LoginWithData);