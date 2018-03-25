import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Segment, Divider, Button, Image, Form, Icon, Popup } from 'semantic-ui-react';
import FacebookProvider, { Page } from 'react-facebook';
import { omit, pick } from 'lodash';
import autoBind from 'react-autobind';

import { withInfo } from '~/src/hocs';
import { assetsUrl } from '~/src/utils/url';
import MailingAPI from '~/src/toakee-core/apis/mailing';
import { FACEBOOK_APP_ID, FACEBOOK_PAGE_URI } from '~/src/config';

import { validateContact } from './validation';

if (process.env.BROWSER) {
  require('./style.scss');
}

const MESSAGE_LIMIT = 200;

const initialState = extra => ({
  name: '',
  email: '',
  message: '',
  counter: 0,
  subscribe: false,
  formState: 0,
  ...extra,
});

const FormState = {
  IDLE: 0,
  LOADING: 1,
  DONE: 2,
  ERROR: 3,
};

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState({ errors: {} });
    autoBind(this);
  }

  handleChange(e, { name, value }) {
    if (name !== 'message' || value.length <= MESSAGE_LIMIT) {
      this.setState({
        [name]: value,
        errors: omit(this.state.errors, name),
        counter: name === 'message' ? value.length : this.state.counter,
      });
    }
  }

  handleCheckboxChange(e, { name, checked }) {
    this.setState({ [name]: checked });
  }

  handleSubmit(e) {
    e.preventDefault();

    const form = pick(this.state, ['name', 'email', 'message', 'subscribe']);
    const errors = validateContact(form);

    this.setState({ errors: errors || {} });

    if (!errors) {
      this.setState({ formState: FormState.LOADING });
      MailingAPI.send(form.email, form.name, form.message, form.subscribe)
        .then(() => this.setState({ formState: FormState.DONE }))
        .catch(() => this.setState({ formState: FormState.ERROR }))
        .then(this.initCountdown);
    }
  }

  initCountdown() {
    setTimeout(() => this.setState(initialState()), 15000);
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

  render() {
    const { viewer = {} } = this.props;
    const {
      name,
      email,
      message,
      counter,
      formState,
    } = this.state;

    const buttonColor = {
      [FormState.DONE]: 'green',
      [FormState.ERROR]: 'red',
    }[formState] || null;

    const buttonContent = {
      [FormState.IDLE]: 'Enviar',
      [FormState.LOADING]: 'Enviando...',
      [FormState.DONE]: 'Enviado!',
      [FormState.ERROR]: 'Um erro ocorreu, tente novamente',
    }[formState];

    const triggerDisabled = !!this.state.formState;

    return (
      <footer className="Footer">
        <Grid columns={2} relaxed>
          <Grid.Column className="Footer-column social">
            <Divider horizontal inverted >Estamos Aqui!</Divider>
            <Segment basic>
              <FacebookProvider appId={FACEBOOK_APP_ID}>
                <Page href={FACEBOOK_PAGE_URI} tabs="true" smallHeader adaptContainerWidth />
              </FacebookProvider>
            </Segment>
            <a href="https://www.facebook.com/eu.toakee" aria-label="facebook">
              <Icon circular name="facebook" size="big" />
            </a>
            <a href="https://www.instagram.com/eu.toakee" aria-label="instagram">
              <Icon circular name="instagram" size="big" />
            </a>
            <a href="https://linkedin.com/company/toakee" aria-label="linkedin">
              <Icon circular name="linkedin" size="big" />
            </a>
          </Grid.Column>
          <Grid.Column className="Footer-column">
            <Divider horizontal inverted >Contato</Divider>
            <Segment basic>
              <Form.Group>
                <Form
                  inverted
                  aria-label="contato"
                  className="Footer-form"
                  size="small"
                  onSubmit={this.handleSubmit}
                >
                  <Form.Input
                    required
                    aria-required="true"
                    aria-label="nome"
                    placeholder="Como te chamaremos?"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                    disabled={triggerDisabled}
                    icon={this.renderErrorIcon('name')}
                    error={!!this.state.errors.name}
                  />
                  <Form.Input
                    required
                    aria-required="true"
                    aria-label="e-mail"
                    placeholder="Qual o seu e-mail?"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    disabled={triggerDisabled}
                    icon={this.renderErrorIcon('email')}
                    error={!!this.state.errors.email}
                  />
                  <Form.TextArea
                    required
                    aria-required="true"
                    aria-label="mensagem"
                    placeholder="Digite aqui sua mensagem"
                    rows={2}
                    name="message"
                    value={message}
                    onChange={this.handleChange}
                    disabled={triggerDisabled}
                  />
                  <label className="Footer-form-placeholder">
                    Restam apenas {MESSAGE_LIMIT - counter} caracteres.
                  </label>
                  <Form.Checkbox
                    inline
                    aria-label="quero receber e-mails do site"
                    className="Footer-form-checkbox"
                    label="Quero receber e-mails com sugestões, promoções e novidades."
                    name="subscribe"
                    onChange={this.handleCheckboxChange}
                    disabled={triggerDisabled}
                  />
                  <Button
                    basic
                    inverted
                    className="Footer-form-submit"
                    color={buttonColor}
                    name="submit"
                    loading={formState === FormState.LOADING}
                    size="large"
                    disabled={triggerDisabled}
                  >
                    {buttonContent}
                  </Button>
                </Form>
              </Form.Group>
            </Segment>
          </Grid.Column>
        </Grid>
        <Divider className="Footer-divider" clearing />
        <Segment basic>
          <Image
            className="Footer-image"
            src={assetsUrl('/core/site/logo-white-x64.png')}
            size="mini"
            alt="Toakee.com"
            centered
          />
          <Link className="Footer-link about" to="/quem-somos">
            <span>Quem somos?</span>
          </Link>
          <Link className="Footer-link terms" to="/termos-de-uso">
            <span>Termos de Uso</span>
          </Link>
          <If condition={!viewer.id}>
            <Link className="Footer-link signup" to="/cadastrar">
              <span>Cadastre-se</span>
            </Link>
          </If>
          <Segment className="Footer-copyright" basic>
            Copyright &copy; 2017 Toakee. Todos os direitos reservados.
          </Segment>
        </Segment>
      </footer>
    );
  }
}

Footer.propTypes = {
  viewer: PropTypes.object,
};

export default withInfo(Footer, ['viewer']);
