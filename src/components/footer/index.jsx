import React from 'react';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Footer = () => (
  <footer className="Footer mdl-mini-footer">
    <div className="Footer-logo mdl-logo">© ToAKEE 2017</div>
  </footer>
);

export default Footer;
