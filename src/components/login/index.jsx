import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Link, withRouter } from 'react-router';
import { partial } from 'lodash';
import autoBind from 'auto-bind';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';

import LoginMutation from '~/src/mutations/login';
import FacebookLoginMutation from '~/src/mutations/facebook-login';
import { setToken, setFacebookToken } from '~/src/utils/session';
import { stateSetter, errorFromKey } from '~/src/utils/form';
import { extractError } from '~/src/utils/relay';
import FacebookLoginButton from '~/src/components/facebook-login-button';

const propTypes = {
  router: PropTypes.object,
};

const defaultProps = {
  router: {},
};

class Login extends React.Component {
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

  facebookSubmit(token) {
    this.setState({ errorMessage: '' });
    setFacebookToken(token);
    Relay.Store.commitUpdate(
      new FacebookLoginMutation({ token }),
      { onFailure: this.onFailure, onSuccess: partial(this.onSuccess, 'facebookLogin') },
    );
  }

  renderErrorMessage() {
    const { errorMessage } = this.state;
    return errorMessage && <div className="Login-form-error">{errorMessage}</div>;
  }

  render() {
    return (
      <div className="Login">
        <div className="Login-form">
          <hr className="Login-form-separator" />
          <FacebookLoginButton onReceiveToken={this.facebookSubmit} />
          {this.renderErrorMessage()}
          <Input
            type="email"
            label="E-mail"
            icon="email"
            value={this.state.username}
            onChange={stateSetter(this, 'username')}
            className="Login-form-username"
          />
          <Input
            type="password"
            label="Senha"
            icon="lock"
            value={this.state.password}
            onChange={stateSetter(this, 'password')}
            className="Login-form-password"
          />
          <Button label="Entrar" onClick={this.submit} raised primary />
          <Link to="/signUp">
            Criar nova conta
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
