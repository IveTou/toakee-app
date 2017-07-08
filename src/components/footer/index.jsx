import React from 'react';

import { Grid, Segment, Divider, Button, Image, Form } from 'semantic-ui-react';
import FacebookProvider, { Page } from 'react-facebook';

import MailingAPI from '~/src/toakee-core/apis/mailing';

import { FACEBOOK_APP_ID, FACEBOOK_PAGE_URI } from '~/src/config';

if (process.env.BROWSER) {
  require('./style.scss');
}

class Footer extends React.Component {
  state = { email: '', message: '', counter: 'restam 200 caracteres', emailError: true };

  handleValidation = (name, value) => {
    if (name === 'email') {
      const reg = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
      this.setState({ emailError: !reg.test(value) });
      return true;
    } else if (200 - value.length >= 0) {
      this.setState({ counter: `restam ${200 - value.length} caracteres` });
      return true;
    }
    return false;
  }

  handleChange = (e, { name, value }) => {
    if (this.handleValidation(name, value)) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = (e) => {
    const { email, message, emailError } = this.state;
    if (!emailError) {
      MailingAPI.send(email, message);
      this.setState({ email: '', message: '' });
    } else {
      console.log('email error');
    }
    e.preventDefault();
  }

  render() {
    const { email, message, counter } = this.state;

    return (
      <footer className="Footer">
        <Grid columns={3} relaxed>
          <Grid.Column className="Footer-col">
            <Divider horizontal inverted >Seja Nosso Amigo!</Divider>
            <Segment basic>
              <FacebookProvider appId={FACEBOOK_APP_ID}>
                <Page href={FACEBOOK_PAGE_URI} tabs smallHeader adaptContainerWidth />
              </FacebookProvider>
            </Segment>
          </Grid.Column>
          <Grid.Column className="Footer-col">
            <Divider horizontal inverted >Sobre Nós</Divider>
            <Segment basic>
              <Button.Group vertical>
                <Button size="large" className="Button about"><span>Quem somos</span></Button>
                <Button size="large" className="Button terms"><span>Termos de Uso</span></Button>
                <Button size="large" className="Button signup"><span>Cadastre-se</span></Button>
              </Button.Group>
            </Segment>
          </Grid.Column>
          <Grid.Column className="Footer-col">
            <Divider horizontal inverted >Contato</Divider>
            <Segment basic>
              <Form inverted className="Form" size="large" onSubmit={this.handleSubmit}>
                <Form.Input
                  required
                  placeholder="E-mail"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
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
                  required
                  inline
                  label="Quero receber e-mails com sugestões, promoções e novidades."
                />
                <Button size="large" className="Button submit"><span>Enviar</span></Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
        <Divider className="Divider" clearing />
        <Segment basic>
          <Image
            className="Image"
            src="http://res.cloudinary.com/toakeeassets/image/upload/s--4-qYLsm3--/v1499001957/core/site/icon-x64.png"
            size="mini"
            alt="Toakee.com"
            centered
          />
          <Segment basic>Copyright &copy; 2017 Toakee. Todos os direitos reservados.</Segment>
        </Segment>
      </footer>
    );
  }
}

export default Footer;
