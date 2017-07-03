import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Footer = () => (
  <footer className="Footer mdl-mini-footer">
    <div className="Footer-row">
      <div className="Footer-row-col social">
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
      <img src="http://res.cloudinary.com/toakeeassets/image/upload/s--4-qYLsm3--/v1499001957/core/site/icon-x64.png" />
      <p>Copyright &copy; 2017 Toakee. Todos os direitos reservados.</p>
    </div>
  </footer>
);

export default Footer;
