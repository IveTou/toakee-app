import React, { PropTypes } from 'react';
import TrackingAPI from '~/src/toakee-core/apis/tracking';
import { Link } from 'react-router';
import { partial, upperCase } from 'lodash';
import autoBind from 'react-autobind';

import { login, socialLogin } from '~/src/toakee-core/ducks/auth';

import { setToken, setSocialToken } from '~/src/utils/session';
import { errorFromKey, formRef } from '~/src/utils/form';

import StrikedText from '~/src/components/striked-text';
import SocialLoginButton from '~/src/components/social-login-button';
import Input from '~/src/components/input';
import Button from '~/src/components/button';
import { showToast } from '~/src/components/snackbar';

const propTypes = {
  router: PropTypes.object,
};

const defaultProps = {
  router: {},
};

if (process.env.BROWSER) {
  require('./style.scss');
}

export default class Login extends React.Component {
  defaultProps: defaultProps;

  constructor(props: propTypes) {
    super(props);
    autoBind(this);
  }

  onSuccess(mutation, response) {
    setToken(response[mutation]);
    this.props.router.push('/redirect');
  }

  submit(e) {
    e.preventDefault();

    const username = this.form.username.value;
    const password = this.form.password.value;

    if (!(username && password)) {
      showToast(errorFromKey('All.UNFILLED'));
      return;
    }

    TrackingAPI.track('Loginpage Login trigger', 'Guest');

    login(username, password)
      .then(partial(this.onSuccess, 'login'))
      .catch(es => showToast(errorFromKey(es && es[0])));
  }

  socialSubmit(network, token) {
    setSocialToken(network, token);

    socialLogin(upperCase(network), token)
      .then(partial(this.onSuccess, 'socialLogin'))
      .catch(es => showToast(errorFromKey(es && es[0])));
  }

  render() {
    return (
      <div className="Login">
        <StrikedText>Entre com</StrikedText>
        <div className="Login-social">
          <SocialLoginButton network="facebook" onReceiveToken={this.socialSubmit} />
        </div>
        <StrikedText>ou</StrikedText>
        <form ref={formRef(this)} className="Login-form">
          <Input
            type="email"
            name="username"
            placeholder="e-mail"
            className="Login-form-username"
          />
          <Input
            type="password"
            name="password"
            placeholder="senha"
            className="Login-form-password"
          />
          <div className="Login-form-signUp">
            <Link to={{ pathname: '/cadastrar' }}>
              Não tenho cadastro
            </Link>
          </div>
          <div className="Login-form-forgotPassword">
            <Link to={{ pathname: '/recuperar-senha' }}>
              Esqueci minha senha
            </Link>
          </div>
          <Button
            label="Entrar"
            className="Login-form-submit"
            onClick={this.submit}
            raised
            accent
            block
          />
        </form>
      </div>
    );
  }
}
