import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Footer = ({ compressed }) => {
    const classes = classNames('Footer', { 'Footer--compressed': compressed });

    return (
      <footer className={classes}>
            <a href="https://www.facebook.com/eu.toakee" aria-label="facebook">
            </a>
            <a href="https://www.instagram.com/eu.toakee" aria-label="instagram">
            </a>
            <a href="https://linkedin.com/company/toakee" aria-label="linkedin">
            </a>
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
