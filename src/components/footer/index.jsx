import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, FontIcon } from 'material-ui';
import { NavigationMenu } from 'material-ui/svg-icons';
import classNames from 'classnames';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Footer = ({ compressed }) => {
    const classes = classNames('Footer', { 'Footer--compressed': compressed });

    return (
      <footer className={classes}>
        <div className="Footer-contact">
          <IconButton
            href="https://www.facebook.com/eu.toakee"
            aria-label="facebook"
          />
          <IconButton href="https://www.instagram.com/eu.toakee" aria-label="instagram">
          </IconButton>
          <IconButton href="https://linkedin.com/company/toakee" aria-label="linkedin">
          </IconButton>
        </div>
          <Link className="Footer-link about" to="/quem-somos">
            <span>Quem somos?</span>
          </Link>
          <Link className="Footer-link terms" to="/termos-de-uso">
            <span>Termos de Uso</span>
          </Link>
          <div className="Footer-copyright" >
            Copyright &copy; 2017 Toakee. Todos os direitos reservados.
          </div>
      </footer>
    );
}

Footer.propTypes = {
  compressed: PropTypes.bool,
};

export default Footer;
