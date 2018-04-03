import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Link } from 'react-router-dom';
import { Form, Icon, Divider, Popup } from 'semantic-ui-react';
import { pick, omit } from 'lodash';

import { alertGraphQLError } from '~/src/ducks/snackbar';
import { login } from '~/src/utils/session';

import { validateSignUp } from './validation';
import { signUpMutation } from './graphql';
import AuthWrapper from './';

if (process.env.BROWSER) {
  require('./style.scss');
}

const propTypes = {
  router: PropTypes.object,
  signUp: PropTypes.func,
  alert: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

const defaultProps = {
  router: {},
};

export class SignUp extends React.Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

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
          login(token);
          this.props.history.push('/');
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
      <AuthWrapper slideshow>
        <div className="SignUp">
          <Divider horizontal>Nova conta</Divider>
          <Form onSubmit={this.onSubmit} aria-label="cadastro">
            <Form.Group widths="equal">
              <Form.Input
                aria-label="nome"
                aria-required="true"
                placeholder="Nome"
                name="firstName"
                onChange={this.onChange}
                value={firstName}
                icon={this.renderErrorIcon('firstName')}
                error={!!this.state.errors.firstName}
              />
              <Form.Input
                aria-label="sobrenome"
                aria-required="true"
                placeholder="Sobrenome"
                name="lastName"
                onChange={this.onChange}
                value={lastName}
                icon={this.renderErrorIcon('lastName')}
                error={!!this.state.errors.lastName}
              />
            </Form.Group>
            <Form.Input
              aria-label="usuário"
              aria-required="true"
              placeholder="Usuário"
              name="username"
              onChange={this.onChange}
              value={username}
              icon={this.renderErrorIcon('username')}
              error={!!this.state.errors.username}
            />
            <Form.Input
              aria-label="e-mail"
              aria-required="true"
              type="email"
              name="email"
              placeholder="E-mail"
              onChange={this.onChange}
              value={email}
              icon={this.renderErrorIcon('email')}
              error={!!this.state.errors.email}
            />
            <Form.Input
              aria-label="senha"
              aria-required="true"
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
            >
              Criar minha conta
            </Form.Button>
            <p>
              Ao criar uma conta, você está concordando com os nossos&nbsp;
              <Link to="/termos-de-uso">Termos de Uso</Link>
              .
            </p>
            <Link className="AuthWrapper-link" to="/login">
              Já possuo uma conta
            </Link>
          </Form>
        </div>
      </AuthWrapper>
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
