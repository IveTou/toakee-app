import React from 'react';

import { Grid, Segment, Divider, Button, Image, Form, Input, TextArea, Message } from 'semantic-ui-react';
import FacebookProvider, { Page } from 'react-facebook';

import { FACEBOOK_APP_ID, FACEBOOK_PAGE_URI } from '~/src/config';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Footer = () => (
  <footer className="Footer mdl-mini-footer">
    <Grid columns={3} relaxed>
      <Grid.Column>
        <Divider horizontal inverted >Seja Nosso Amigo!</Divider>
        <Segment basic>
          <FacebookProvider appId={FACEBOOK_APP_ID}>
            <Page href={FACEBOOK_PAGE_URI} tabs smallHeader adaptContainerWidth />
          </FacebookProvider>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Divider horizontal inverted >Sobre Nós</Divider>
        <Segment basic>
          <Button.Group vertical>
            <Button basic size="large" className="Button about"><span>Quem somos</span></Button>
            <Button basic size="large" className="Button terms"><span>Termos de Uso</span></Button>
            <Button basic size="large" className="Button signup"><span>Cadastre-se</span></Button>
          </Button.Group>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Divider horizontal inverted >Sobre Nós</Divider>
        <Segment basic>
          <Form inverted className="Form" size="large">
            <Form.Input
              required
              className="Form-input"
              label="E-mail"
              placeholder="visitante@dominio.com"
            />
            <Form.Field
              required
              className="Form-field" 
              id="form-textarea"
              control={TextArea} 
              label="Mensagem"
              placeholder="Digite aqui sua mensagem"
            />
            <Message
              success
              header="Mensagem enviada com sucesso"
              content="Obrigado por entrar em contato. Nos vemos em breve!"
            />
            <Message
              error
              header='Algum erro ocorreu'
              content='Por favor, cheque sua conexão ou tente mais tarde.'
            />
            <Form.Checkbox
              inline
              label='Quero receber e-mails com sugestões, promoções e novidades.'
              required
            />
            <Button size="large" className="Button submit"><span>Enviar</span></Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
    <Divider clearing/>
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

export default Footer;
