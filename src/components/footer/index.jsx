import React from 'react';

import { Button, Image, Form, Input, TextArea, Message } from 'semantic-ui-react';
import FacebookProvider, { Page } from 'react-facebook';

import { FACEBOOK_APP_ID, FACEBOOK_PAGE_URI } from '~/src/config';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Footer = () => (
  <footer className="Footer mdl-mini-footer">
    <div className="Footer-row">
      <div className="Footer-row-col social">
        <h2 className="header">Seja nosso amigo!</h2>
        <FacebookProvider appId={FACEBOOK_APP_ID}>
          <Page href={FACEBOOK_PAGE_URI} tabs smallHeader adaptContainerWidth />
        </FacebookProvider>
      </div>
      
      <div className="Footer-row-divider" />

      <ul className="Footer-row-col about">
        <h2 className="header">Sobre Nós</h2>
        <li>
          <Button size="large" className="Button about">
            <span>Quem somos</span>
          </Button>
        </li>
        <li>
          <Button size="large" className="Button terms">
            <span>Termos de Uso</span>
          </Button>
        </li>
        <li>
          <Button size="large" className="Button signup">
            <span>Cadastre-se</span>
          </Button>
        </li>
      </ul>

      <div className="Footer-row-divider" />
    
      <div className="Footer-row-col form">
        <h2 className="header">Fale Conosco</h2>
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
          <Message
            warning
            header='Algo está incorreto'
            list={[
              'Por favor, cheque seu endereço de e-mail e certifique-se que a mensagem não está vazia.',
            ]}
          />
          <Form.Checkbox
            inline
            label='Quero receber e-mails com sugestões, promoções e novidades.'
            required
          />
          <Button size="large" className="Button submit"><span>Enviar</span></Button>
        </Form>
      </div>

    </div> 
    <hr/>
    <div className="Footer-bottom">
      <Image
        className="Image" 
        src="http://res.cloudinary.com/toakeeassets/image/upload/s--4-qYLsm3--/v1499001957/core/site/icon-x64.png"
        size="mini"
        alt="Toakee.com"
        centered
      />
      <p>Copyright &copy; 2017 Toakee. Todos os direitos reservados.</p>
    </div>
  </footer>
);

export default Footer;
