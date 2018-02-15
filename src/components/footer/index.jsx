import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import  { Facebook, Instagram, Linkedin } from './social-icons';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Footer = ({ compressed }) => {
  const classes = classNames('Footer', { 'Footer--compressed': compressed });

  return (
    <footer className={classes}>
      <div className="Footer-content">
        <div className="Footer-content-row">
          <div className="Footer-content-row-contact column">
            <p>Fale conosco</p>
            <ul>
              <li>contato@toakee.com</li>
              <li>+55 71 996 763 313</li>
              <li>Salvador-Ba</li>
            </ul>
          </div>
          <div className="Footer-content-row-services column">
            <p>Serviços</p>
            <ul>
              <li>
                <Link className="Footer-content-row-services-event" to="/evento/novo">
                  <span>Crie seu evento</span>
                </Link>
              </li>
              <li>
                <Link className="Footer-content-row-services-signup" to="/cadastrar">
                  <span>Cadastre-se</span>
                </Link>
              </li>
              <li>
                <Link className="Footer-content-row-services-dashboard" to="/dashboard">
                  <span>Meus eventos</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="Footer-content-row-about column">
            <p>Sobre nós</p>
            <ul>
              <li>
                <Link className="Footer-link about" to="/quem-somos">
                  <span>Quem somos?</span>
                </Link>
              </li>
              <li>
                <Link className="Footer-link terms" to="/termos-de-uso">
                  <span>Termos de Uso</span>
                </Link>
              </li>
              <li>
                <Link className="Footer-link privacy" to="/privacidade">
                  <span>Políticas de Privacidade</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="Footer-content-row-social column">
            <p>Estamos aqui!</p>
            <ul>
              <a href="https://www.facebook.com/eu.toakee" aria-label="facebook">
                <Facebook />
              </a>
              <a href="https://www.instagram.com/eu.toakee" aria-label="instagram">
                <Instagram />
              </a>
              <a href="https://linkedin.com/company/toakee" aria-label="linkedin">
                <Linkedin />
              </a>
            </ul>
          </div>
        </div>
        <div className="Footer-content-copyright" >
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
