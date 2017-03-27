import React from 'react';
import autoBind from 'auto-bind';
import { Link } from 'react-router';

import { recoverPassword } from '~/src/toakee-core/ducks/auth';

import { errorFromKey } from '~/src/utils/form';

import { showToast } from '~/src/components/snackbar';
import Input from '~/src/components/input';
import Button from '~/src/components/button';

if (process.env.BROWSER) {
  require('./style.scss');
}

export default class RecoverPassword extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  submit(e) {
    e.preventDefault();

    const input = this.form.input.value;

    if (!input) {
      showToast(errorFromKey('All.UNFILLED'));
      return;
    }

    recoverPassword(input)
      .then(() => {})
      .catch(() => {});
  }

  render() {
    return (
      <div className="RecoverPassword">
        <div className="RecoverPassword-title">
          Esqueceu sua senha?
        </div>
        <div className="RecoverPassword-subtitle">
          Insira abaixo seu e-mail e<br />
          nós te ajudaremos a recuperá-la.
        </div>

        <form className="RecoverPassword-form">
          <Input
            type="email"
            name="email"
            placeholder="e-mail"
          />
          <Button
            label="Recuperar senha"
            onClick={this.submit}
            raised
            accent
            block
          />
          <Link to={{ pathname: '/login' }}>
            <Button
              className="RecoverPassword-form-back"
              label="Voltar"
              block
            />
          </Link>
        </form>
      </div>
    );
  }
}
