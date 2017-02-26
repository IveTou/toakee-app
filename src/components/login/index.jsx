import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { partial } from 'lodash';
import autoBind from 'auto-bind';

import LoginMutation from '~/src/mutations/login';
import SocialLoginMutation from '~/src/mutations/social-login';
import { setToken, setSocialToken } from '~/src/utils/session';
import { errorFromKey } from '~/src/utils/form';
import { extractError } from '~/src/utils/relay';

import Footer from '~/src/components/footer';
import Logo from '~/src/components/logo';
import StrikedText from '~/src/components/striked-text';
import SocialLoginButton from '~/src/components/social-login-button';
import Input from '~/src/components/input';
import Button from '~/src/components/button';

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
    this.state = {
      errorMessage: '',
      username: '',
      password: '',
    };
    autoBind(this);
  }

  onSuccess(mutation, response) {
    setToken(response[mutation].token);
    this.props.router.push('/redirect');
  }

  onFailure(transaction) {
    this.setState({ errorMessage: errorFromKey(extractError(transaction)) });
  }

  submit() {
    const { username, password } = this.state;

    if (!(username && password)) {
      this.setState({ errorMessage: errorFromKey('All.UNFILLED') });
      return;
    }

    this.setState({ errorMessage: '' });
    Relay.Store.commitUpdate(
      new LoginMutation({ username, password }),
      { onFailure: this.onFailure, onSuccess: partial(this.onSuccess, 'login') },
    );
  }

  socialSubmit(network, token) {
    setSocialToken(network, token);
    Relay.Store.commitUpdate(
      new SocialLoginMutation({ network, token }),
      { onFailure: this.onFailure, onSuccess: partial(this.onSuccess, 'socialLogin') },
    );
  }

  renderErrorMessage() {
    const { errorMessage } = this.state;
    return errorMessage && <div className="Login-form-error">{errorMessage}</div>;
  }

  render() {
    return (
      <div className="Login">
        <div className="Login-logo">
          <Logo />
        </div>
        <div className="Login-box">
          <StrikedText>Entre com</StrikedText>
          <div className="Login-box-social">
            <SocialLoginButton network="facebook" onReceiveToken={this.socialSubmit} />
            <SocialLoginButton network="instagram" onReceiveToken={this.socialSubmit} />
          </div>
          <StrikedText>ou</StrikedText>
          <form className="Login-box-form">
            <Input
              type="email"
              placeholder="e-mail"
              icon="email"
              className="Login-box-form-username"
            />
            <Input
              type="password"
              placeholder="senha"
              icon="lock"
              className="Login-box-form-password"
            />
            <Button
              label="Entrar"
              className="Login-box-form-submit"
              onClick={this.submit}
              raised
              accent
              block
            />
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}
