import React, { PropTypes } from 'react';

import { Link } from 'react-router';
import { Grid, Segment, Divider, Button, Image, Form, Icon, Popup } from 'semantic-ui-react';
import FacebookProvider, { Page } from 'react-facebook';
import { omit, pick } from 'lodash';

import { isLogged } from '~/src/utils/session';
import MailingAPI from '~/src/toakee-core/apis/mailing';
import { ASSETS_BASE_URI, FACEBOOK_APP_ID, FACEBOOK_PAGE_URI } from '~/src/config';

import { validateContact } from './validation';

if (process.env.BROWSER) {
  require('./style.scss');
}

const MESSAGE_LIMIT = 200;

const initialState = extra => ({
  email: '',
  message: '',
  counter: 0,
  subscribe: false,
  loading: false,
  popupShown: false,
  popupContent: '',
  ...extra,
});

class Footer extends React.Component {
  state = initialState({ errors: {} });

  handleChange = (e, { name, value }) => {
    if (name !== 'message' || value.length <= MESSAGE_LIMIT) {
      this.setState({
        [name]: value,
        errors: omit(this.state.errors, name),
        counter: name === 'message' ? value.length : this.state.counter,
      });
    }
  }

  handleCheckboxChange = (e, { name, checked }) => {
    this.setState({ [name]: checked });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const form = pick(this.state, ['email', 'message', 'subscribe']);
    const errors = validateContact(form);

    this.setState({ errors: errors || {} });

    if (!errors) {
      this.setState({ loading: true });
      MailingAPI.send(form.email, form.message, form.subscribe)
        .then(() => {
          this.setState(initialState({
            loading: false,
            popupShown: true,
            popupContent: 'Enviado!',
          }));
        })
        .catch(() => {
          this.setState({
            loading: false,
            popupShown: true,
            popupContent: 'Erro ao enviar e-mail. Tente novamente.',
          });
        });
    }
  }

  handlePopupMount = () => {
    this.timeout = setTimeout(() => {
      this.setState({ popupShown: false });
    }, 2500);
  }

  handlePopupClose = () => {
    this.setState({ popupShown: false });
    clearTimeout(this.timeout);
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
    const { email, message, counter, loading, popupShown, popupContent } = this.state;

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
            <a className="Link" href="https://www.facebook.com/eu.toakee">
              <Icon circular className="Icon facebook" name="facebook" />
            </a>
            <a className="Link" href="https://www.instagram.com/eu.toakee">
              <Icon circular className="Icon instagram" name="instagram" />
            </a>
            <a className="Link" href="https://linkedin.com/company/toakee">
              <Icon circular className="Icon linkedin" name="linkedin" />
            </a>
          </Grid.Column>
          <Grid.Column className="Footer-column">
            <Divider horizontal inverted >Contato</Divider>
            <Segment basic>
              <Form.Group widths="equal">
                <Form
                  inverted
                  className="Footer-form"
                  size="large"
                  onSubmit={this.handleSubmit}
                >
                  <Form.Input
                    required
                    placeholder="E-mail"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
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
                  />
                  <Popup
                    trigger={
                      <Button
                        basic
                        inverted
                        name="submit"
                        loading={loading}
                        disabled={loading}
                        size="large"
                        content="Enviar"
                      />
                    }
                    content={popupContent}
                    open={popupShown}
                    onClose={this.handlePopupClose}
                    onMount={this.handlePopupMount}
                    position="top right"
                    hideOnScroll
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
          <Link className="Link Footer-about" to={{ pathname: '/' }}>
            <span>Quem somos</span>
          </Link>
          <Link className="Link Footer-terms" to={{ pathname: '/' }}>
            <span>Termos de Uso</span>
          </Link>
          <If condition={!isLogged()}>
            <Link className="Link Footer-signup" to={{ pathname: '/cadastrar' }}>
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
