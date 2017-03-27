import React from 'react';
import autoBind from 'auto-bind';
import { Link } from 'react-router';

import ToakeeAPI from '~/src/apis/toakee';

import Logo from '~/src/components/logo';
import Button from '~/src/components/button';
import Input from '~/src/components/input';
import TextArea from '~/src/components/text-area';

if (process.env.BROWSER) {
  require('./style.scss');
  require('smoothit');
}

const EmailStatus = {
  DEFAULT: 0,
  SENDING: 1,
  SENT: 2,
};

const EmailReasons = {
  doubt: 'Dúvida',
  suggestion: 'Sugestão',
  criticism: 'Crítica',
};

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      emailStatus: EmailStatus.DEFAULT,
    };
  }

  submit(e) {
    e.preventDefault();
    const { name, email, reason, body } = this.form;
    const subject = `${EmailReasons[reason.value]} de ${email.value}`;

    if (name.value && email.value && body) {
      this.setState({ emailStatus: EmailStatus.SENDING });
      ToakeeAPI
        .sendEmail(name.value, email.value, subject, body.value)
        .then(() => {
          name.value = '';
          email.value = '';
          body.value = '';
          this.setState({ emailStatus: EmailStatus.SENT });
        });
    }
  }

  renderSubmitButton() {
    const { DEFAULT, SENDING, SENT } = EmailStatus;
    const { emailStatus } = this.state;

    const label = {
      [DEFAULT]: 'Enviar Email',
      [SENDING]: 'Enviando',
      [SENT]: 'Enviado!',
    }[emailStatus];

    const props = {
      accent: true,
      raised: true,
      ripple: true,
      block: true,
      done: emailStatus === SENT,
      loading: emailStatus === SENDING,
      disabled: emailStatus !== DEFAULT,
    };

    return <Button label={label} type="submit" {...props} />;
  }

  render() {
    return (
      <div className="Landing mdl-layout mdl-layout--fixed-header">
        <header className="header mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">
              <Logo />
            </span>
            <div className="mdl-layout-spacer" />
            <nav className="mdl-navigation">
              <Link className="mdl-navigation__link" href="#quem-somos">Quem somos</Link>
              <Link className="mdl-navigation__link" href="#contato">Contato</Link>
            </nav>
            <Link to={{ pathname: '/login' }}>
              <Button className="header-action" label="Criar lista" raised ripple accent />
            </Link>
          </div>
        </header>
        <main className="main mdl-layout__content">
          <div className="main-banner">
            <div className="main-banner-content">
              <div className="main-banner-content-title">Crie listas</div>
              <div className="main-banner-content-subtitle">para seus eventos</div>
              <p className="main-banner-content-body">
                Escolha a praticidade! <br />
                Crie listas e gerencie quem vai ao seu evento
                tendo acesso às listas de aniversariantes, listas VIP’s,
                listas que oferecem descontos entre outras...
              </p>
            </div>
          </div>
          <div id="quem-somos" className="main-section main-section-info">
            <div className="main-section-title">Quem somos</div>
            <p className="main-section-info-body">
              O Toakee é uma empresa que conecta pessoas.
              Hoje nós oferecemos o serviço de gerenciamento
              de listas de convidados para eventos com a mais
              nova tecnologia do mercado. Nós buscamos facilitar
              o acesso do nosso público aos mais diversos tipos
              de eventos, com um sistema unificado com redes
              sociais nos proporcionamos uma maior adesão e uma
              nova forma de interagir com a cidade.
            </p>
          </div>
          <div id="contato" className="main-section main-section-contact">
            <div className="main-section-title">Contato</div>
            <form ref={(f) => { this.form = f; }} className="Form" onSubmit={this.submit}>
              <div className="main-section-contact-body">
                <Input label="Nome" name="name" required />
                <Input type="email" label="E-mail" name="email" required />
                <Input
                  label="Qual o motivo do contato?"
                  type="radio"
                  name="reason"
                  value="doubt"
                  checked
                >
                  Dúvida
                </Input>
                <Input type="radio" name="reason" value="suggestion">
                  Sugestão
                </Input>
                <Input type="radio" name="reason" value="criticism">
                  Crítica
                </Input>
              </div>
              <div className="main-section-contact-body">
                <TextArea label="Conte-nos mais" name="body" />
                {this.renderSubmitButton()}
              </div>
            </form>
          </div>
        </main>
      </div>
    );
  }
}
