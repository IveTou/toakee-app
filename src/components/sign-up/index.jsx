import React, { PropTypes } from 'react';
import autoBind from 'auto-bind';
import { Link, withRouter } from 'react-router';

import { signUp } from '~/src/toakee-core/ducks/auth';

import { setToken } from '~/src/utils/session';
import { errorFromKey, formRef } from '~/src/utils/form';

import StrikedText from '~/src/components/striked-text';
import Input from '~/src/components/input';
import Button from '~/src/components/button';
import { showToast } from '~/src/components/snackbar';

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
  }

  submit(e) {
    e.preventDefault();

    const firstName = this.form.firstName.value;
    const lastName = this.form.lastName.value;
    const username = this.form.username.value;
    const email = this.form.email.value;
    const password = this.form.password.value;

    if (!(firstName && lastName && username && email && password)) {
      showToast(errorFromKey('All.UNFILLED'));
      return;
    }

    const onSuccess = ({ signUp: token }) => {
      setToken('user', token);
      this.props.router.push('/redirect');
    };

    signUp(username, password, firstName, lastName, email)
      .then(onSuccess)
      .catch(es => showToast(errorFromKey(es && es[0])));
  }

  render() {
    return (
      <div className="SignUp">
        <StrikedText>Nova conta</StrikedText>
        <form ref={formRef(this)} className="SignUp-form">
          <Input
            className="SignUp-form-firstName"
            placeholder="nome"
            name="firstName"
          />
          <Input
            className="SignUp-form-lastName"
            placeholder="sobrenome"
            name="lastName"
          />
          <Input
            placeholder="usuário"
            name="username"
          />
          <Input
            type="email"
            name="email"
            placeholder="e-mail"
          />
          <Input
            type="password"
            name="password"
            placeholder="senha"
          />
          <Button
            className="SignUp-form-submit"
            label="Criar minha conta"
            onClick={this.submit}
            raised
            accent
            block
          />
          <Link to={{ pathname: '/login' }}>
            <Button
              className="SignUp-form-back"
              label="Voltar"
              block
            />
          </Link>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUp);
