import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { FontIcon } from 'material-ui';
import { NavigationMenu } from 'material-ui/svg-icons';
import classNames from 'classnames';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Footer = ({ compressed }) => {
    const classes = classNames('Footer', { 'Footer--compressed': compressed });

    return (
      <footer className={classes}>
        <div className="Footer-content">
          <div className="Footer-content-contact">
            <div
              href="https://www.facebook.com/eu.toakee"
              aria-label="facebook"
            />
            <div href="https://www.instagram.com/eu.toakee" aria-label="instagram"/>
            <div href="https://linkedin.com/company/toakee" aria-label="linkedin"/>
          </div>
          <div className="Footer-content-actions">
            <Link className="Footer-link about" to="/quem-somos">
              <span>Quem somos?</span>
            </Link>
            <Link className="Footer-link terms" to="/termos-de-uso">
              <span>Termos de Uso</span>
            </Link>
          </div>
          <div className="Footer-copyright" >
            Copyright &copy; 2017 Toakee. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    );
}

Footer.propTypes = {
  compressed: PropTypes.bool,
};

export default Footer;
