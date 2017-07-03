import React from 'react';

import { Button, Image } from 'semantic-ui-react';
import FacebookProvider, { Page } from 'react-facebook';

import { FACEBOOK_APP_ID, FACEBOOK_PAGE_URI } from '~/src/config';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Footer = () => (
  <footer className="Footer mdl-mini-footer">
    <div className="Footer-row">
      <div className="Footer-row-col social">
        <FacebookProvider appId={FACEBOOK_APP_ID}>
          <Page href={FACEBOOK_PAGE_URI} tabs smallHeader adaptContainerWidth />
        </FacebookProvider>
      </div>
      
      <div className="Footer-row-divider" />

      <ul className="Footer-row-col about">
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
