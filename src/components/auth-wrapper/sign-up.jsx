import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Link } from 'react-router';
import { Form, Icon, Divider, Popup } from 'semantic-ui-react';
import { pick, omit } from 'lodash';

import { alertGraphQLError } from '~/src/ducks/snackbar';
import { setToken } from '~/src/utils/session';

import { validateSignUp } from './validation';
import { signUpMutation } from './graphql';

if (process.env.BROWSER) {
  require('./style.scss');
}

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
    autoBind(this);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      passwordVisible: false,
      errors: {},
    };
  }

  onChange(e, { name, value }) {
    this.setState({
      [name]: value,
      errors: omit(this.state.errors, name),
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const form = pick(this.state, ['firstName', 'lastName', 'email', 'username', 'password']);
    const errors = validateSignUp(form);
    this.setState({ errors: errors || {} });

    if (!errors) {
      this.props.signUp(form)
        .then(({ data: { signUp: token } }) => {
          setToken(token);
          this.props.router.push('/redirect');
        })
        .catch(this.props.alert);
    }
  }

  togglePassword() {
    this.setState({ passwordVisible: !this.state.passwordVisible });
  }

  renderErrorIcon(input, icon) {
    const { [input]: errors } = this.state.errors;
    const defaultIcon = <Icon link name="warning" color="red" />;

    return errors && (
      <Popup
        trigger={icon || defaultIcon}
        content={errors[0]}
        position="top center"
        hideOnScroll
      />
    );
  }

  renderPasswordIcon() {
    const { errors, passwordVisible } = this.state;
    const passwordIcon = (
      <Icon
        name={passwordVisible ? 'eye' : 'low vision'}
        onClick={this.togglePassword}
        color={errors.password && 'red'}
        link
      />
    );

    return this.renderErrorIcon('password', passwordIcon) || passwordIcon;
  }

  render() {
    const { firstName, lastName, username, email, password, passwordVisible } = this.state;

    return (
      <div className="SignUp">
        <Divider horizontal>Nova conta</Divider>
        <Form onSubmit={this.onSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              placeholder="Nome"
              name="firstName"
              onChange={this.onChange}
              value={firstName}
              icon={this.renderErrorIcon('firstName')}
              error={!!this.state.errors.firstName}
            />
            <Form.Input
              placeholder="Sobrenome"
              name="lastName"
              onChange={this.onChange}
              value={lastName}
              icon={this.renderErrorIcon('lastName')}
              error={!!this.state.errors.lastName}
            />
          </Form.Group>
          <Form.Input
            placeholder="Usuário"
            name="username"
            onChange={this.onChange}
            value={username}
            icon={this.renderErrorIcon('username')}
            error={!!this.state.errors.username}
          />
          <Form.Input
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={this.onChange}
            value={email}
            icon={this.renderErrorIcon('email')}
            error={!!this.state.errors.email}
          />
          <Form.Input
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            placeholder="Senha"
            onChange={this.onChange}
            value={password}
            error={!!this.state.errors.password}
            icon={this.renderPasswordIcon()}
          />
          <Form.Button
            content="Criar minha conta"
            color="orange"
            fluid
          />
          <Link className="AuthWrapper-link" to={{ pathname: '/login' }}>
            Já possuo uma conta
          </Link>
        </Form>
      </div>
    );
  }
}

const SignUpWithMutation = graphql(signUpMutation, {
  props: ({ mutate }) => ({
    signUp: variables => mutate({ variables }),
  }),
})(SignUp);

export default connect(
  () => ({}),
  dispatch => ({
    alert: error => dispatch(alertGraphQLError(error)),
  }),
)(SignUpWithMutation);
