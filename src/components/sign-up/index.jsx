import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import autoBind from 'auto-bind';
import { Link, withRouter } from 'react-router';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';

import SignUpMutation from '~/src/mutations/sign-up';
import { setToken } from '~/src/utils/session';
import { extractError } from '~/src/utils/relay';
import { stateSetter, errorFromKey } from '~/src/utils/form';

const propTypes = {
  router: PropTypes.object,
};

const defaultProps = {
  router: {},
};

export class SignUp extends React.Component {
  defaultProps: defaultProps;

  constructor(props: propTypes) {
    super(props);
    this.state = {
      errorMessage: '',
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    };
    autoBind(this);
  }

  submit() {
    const { firstName, lastName, username, email, password } = this.state;

    if (!(firstName && lastName && username && email && password)) {
      this.setState({ errorMessage: errorFromKey('All.UNFILLED') });
      return;
    }

    const onFailure = transaction => (
      this.setState({ errorMessage: errorFromKey(extractError(transaction)) })
    );

    const onSuccess = ({ signUp }) => {
      setToken('user', signUp.token);
      this.props.router.push('/redirect');
    };

    this.setState({ errorMessage: '' });
    Relay.Store.commitUpdate(
      new SignUpMutation({
        firstName,
        lastName,
        username,
        email,
        password,
      }),
      { onFailure, onSuccess },
    );
  }

  renderErrorMessage() {
    const { errorMessage } = this.state;
    return errorMessage && <div className="SignUp-form-error">{errorMessage}</div>;
  }

  render() {
    return (
      <div className="SignUp">
        <div className="SignUp-form">
          {this.renderErrorMessage()}
          <Input
            type="text"
            label="Nome"
            value={this.state.firstName}
            onChange={stateSetter(this, 'firstName')}
          />
          <Input
            type="text"
            label="Sobrenome"
            value={this.state.lastName}
            onChange={stateSetter(this, 'lastName')}
          />
          <Input
            type="text"
            label="Usuário"
            value={this.state.username}
            onChange={stateSetter(this, 'username')}
          />
          <Input
            type="email"
            label="E-mail"
            value={this.state.email}
            onChange={stateSetter(this, 'email')}
          />
          <Input
            type="password"
            label="Senha"
            value={this.state.password}
            onChange={stateSetter(this, 'password')}
          />
          <Button label="Criar minha conta" onClick={this.submit} raised primary />

          <div className="SignUp-form-back">
            <Link to={{ pathname: '/login' }}>
              Já possuo uma conta
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);

