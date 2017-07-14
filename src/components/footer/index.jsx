import React, { PropTypes } from 'react';

import { Link } from 'react-router';
import { Grid, Segment, Divider, Button, Image, Form, Icon, Popup } from 'semantic-ui-react';
import FacebookProvider, { Page } from 'react-facebook';
import { pick, omit } from 'lodash';

import { ASSETS_BASE_URI, FACEBOOK_APP_ID, FACEBOOK_PAGE_URI } from '~/src/config';
import { validateContact } from '~/src/components/auth-wrapper/validation';
import MailingAPI from '~/src/toakee-core/apis/mailing';

if (process.env.BROWSER) {
  require('./style.scss');
}

class Footer extends React.Component {
  state = {
    email: '',
    message: '',
    counter: 'restam 200 caracteres',
    subscribe: false,
    loading: false,
    errors: {},
  };

  handleChange = (e, { name, value }) => {
    if(name == 'message') {
      if (200 - value.length >= 0) {
        this.setState({
          [name]: value,
          errors: omit(this.state.erros, name),
          counter: `restam ${200 - value.length} caracteres`,
        });
      }
    } else {
      this.setState({
        [name]: value,
        errors: omit(this.state.erros, name),
      });
    }
  }

  handleCheckboxChange = (e, { name, checked }) => {
    this.setState({ 'subscribe': checked });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const form = pick(this.state, ['email', 'message', 'subscribe']);
    const errors = validateContact(pick(form, ['email']));
    this.setState({errors: errors || {}, loading: true });

    if(!errors) {
      MailingAPI.send(form.email, form.message, form.subscribe);
      this.setState({ email: '', message: '', counter: 'restam 200 caracteres', })
    }
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

  renderMailSendMessage(input, icon) {
    return (
      <Popup
        trigger={}
        content="E-mail enviado!"
        on='click'
        open={this.state.isOpen}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        position='top right'
        hideOnScroll
      />
    );
  }

  render() {
    const { email, message, counter, loading } = this.state;

    return (
      <footer className="Footer">
        <Grid columns={2} relaxed>
          <Grid.Column className="Footer-col">
            <Divider horizontal inverted >Estamos Aqui!</Divider>
            <Segment basic>
              <FacebookProvider appId={FACEBOOK_APP_ID}>
                <Page href={FACEBOOK_PAGE_URI} tabs smallHeader adaptContainerWidth />
              </FacebookProvider>
            </Segment>
              <Link to={{ pathname: '/'  }}>
                <Icon circular className="Icon facebook" name='facebook' />
              </Link>
              <Link to={{ pathname: '/'  }}>
                <Icon circular className="Icon instagram" name='instagram' />
              </Link>
              <Link to={{ pathname: '/'  }}>
                <Icon circular className="Icon linkedin" name='linkedin' />
              </Link>
          </Grid.Column>
          <Grid.Column className="Footer-col">
            <Divider horizontal inverted >Contato</Divider>
            <Segment basic>
              <Form.Group widths="equal">
                <Form
                  inverted
                  className="Form"
                  size="large"
                  onSubmit={this.handleSubmit}>
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
                    id="form-textarea"
                    placeholder="Digite aqui sua mensagem"
                    rows={2}
                    name="message"
                    value={message}
                    onChange={this.handleChange}
                  />
                  <label className="placeholder">{counter}</label>
                  <Form.Checkbox
                    inline
                    className="Form-checkbox"
                    label="Quero receber e-mails com sugestões, promoções e novidades."
                    name="checkbox"
                    onChange={this.handleCheckboxChange}
                  />
                  <Button
                    basic
                    inverted
                    name="submit"
                    loading={loading}
                    disabled={loading}
                    size="large"
                    content="Enviar"
                    icon={this.renderMailSendMessage('loading')}
                  />
                </Form>
              </Form.Group>
            </Segment>
          </Grid.Column>
        </Grid>
        <Divider className="Divider" clearing />
        <Segment basic>
          <Image
            className="Image"
            src={`${ASSETS_BASE_URI}/core/site/icon-x64.png`}
            size="mini"
            alt="Toakee.com"
            centered
          />
            <Link className="Link about" to={{ pathname: '/'  }}><span>Quem somos</span></Link>
            <Link className="Link terms" to={{ pathname: '/' }}><span>Termos de Uso</span></Link>
            <Link className="Link signup" to={{ pathname: '/cadastrar' }}><span>Cadastre-se</span></Link>
          <Segment className="Copyright" basic>Copyright &copy; 2017 Toakee. Todos os direitos reservados.</Segment>
        </Segment>
      </footer>
    );
  }
}

Footer.propTypes = {
  dispatch: PropTypes.func,
};

export default Footer;
