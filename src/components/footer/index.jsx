import React, { PropTypes } from 'react';

import { Link } from 'react-router';
import { Grid, Segment, Divider, Button, Image, Form, Icon, Popup } from 'semantic-ui-react';
import FacebookProvider, { Page } from 'react-facebook';
import { omit, pick } from 'lodash';
import autoBind from 'react-autobind';

import { isLogged } from '~/src/utils/session';
import MailingAPI from '~/src/toakee-core/apis/mailing';
import { ASSETS_BASE_URI, FACEBOOK_APP_ID, FACEBOOK_PAGE_URI } from '~/src/config';

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
  loading: false,
  formDisabled: false,
  buttonContent: 'Enviar',
  buttonColor: '',
  ...extra,
});

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
      this.setState({ loading: true, formDisabled: true });
      MailingAPI.send(form.email, form.name, form.message, form.subscribe)
        .then(() => {
          this.setState(initialState({
            loading: false,
            buttonColor: 'green',
            formDisabled: true,
            buttonContent: 'Enviado!',
          }));
        })
        .catch(() => {
          this.setState({
            loading: false,
            buttonColor: 'red',
            formDisabled: true,
            buttonContent: 'Erro ao enviar e-mail. Tente novamente.',
          });
        })
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
    const {
      name,
      email,
      message,
      counter,
      loading,
      formDisabled,
      buttonContent,
      buttonColor,
    } = this.state;

    return (
      <footer className="Footer">
        <Grid columns={2} relaxed>
          <Grid.Column className="Footer-column">
            <Divider horizontal inverted >Estamos Aqui!</Divider>
            <Segment basic>
              <FacebookProvider appId={FACEBOOK_APP_ID}>
                <Page href={FACEBOOK_PAGE_URI} tabs="true" smallHeader adaptContainerWidth />
              </FacebookProvider>
            </Segment>
            <a href="https://www.facebook.com/eu.toakee">
              <Icon circular name="facebook" size="big" />
            </a>
            <a href="https://www.instagram.com/eu.toakee">
              <Icon circular name="instagram" size="big" />
            </a>
            <a href="https://linkedin.com/company/toakee">
              <Icon circular name="linkedin" size="big" />
            </a>
          </Grid.Column>
          <Grid.Column className="Footer-column">
            <Divider horizontal inverted >Contato</Divider>
            <Segment basic>
              <Form.Group widths="equal">
                <Form
                  inverted
                  className="Footer-form fields"
                  size="small"
                  onSubmit={this.handleSubmit}
                >
                  <Form.Input
                    required
                    placeholder="Como te chamaremos?"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                    disabled={formDisabled}
                    icon={this.renderErrorIcon('name')}
                    error={!!this.state.errors.name}
                  />
                  <Form.Input
                    required
                    placeholder="Qual o seu e-mail?"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    disabled={formDisabled}
                    icon={this.renderErrorIcon('email')}
                    error={!!this.state.errors.email}
                  />
                  <Form.TextArea
                    required
                    placeholder="Digite aqui sua mensagem"
                    rows={2}
                    name="message"
                    value={message}
                    onChange={this.handleChange}
                    disabled={formDisabled}
                  />
                  <label className="Footer-form-placeholder">
                    Restam apenas {MESSAGE_LIMIT - counter} caracteres.
                  </label>
                  <Form.Checkbox
                    inline
                    className="Footer-form-checkbox"
                    label="Quero receber e-mails com sugestões, promoções e novidades."
                    name="checkbox"
                    onChange={this.handleCheckboxChange}
                    disabled={formDisabled}
                  />
                  <Button
                    basic
                    inverted
                    className="Footer-form-submit"
                    color={buttonColor}
                    name="submit"
                    loading={loading}
                    size="large"
                    content={buttonContent}
                    disabled={formDisabled}
                  />
                </Form>
              </Form.Group>
            </Segment>
          </Grid.Column>
        </Grid>
        <Divider className="Footer-divider" clearing />
        <Segment basic>
          <Image
            className="Footer-image"
            src={`${ASSETS_BASE_URI}/core/site/icon-x64.png`}
            size="mini"
            alt="Toakee.com"
            centered
          />
          <Link className="Footer-link about" to={{ pathname: '/' }}>
            <span>Quem somos</span>
          </Link>
          <Link className="Footer-link terms" to={{ pathname: '/' }}>
            <span>Termos de Uso</span>
          </Link>
          <If condition={!isLogged()}>
            <Link className="Footer-link signup" to={{ pathname: '/cadastrar' }}>
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
  dispatch: PropTypes.func,
};

export default Footer;
