import React from 'react';
import { Link } from 'react-router';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Logo = () => (
  <Link to={{ pathname: '/' }} >
    <img className="Logo" alt="toakee logo" src="/imgs/logo.png" />
  </Link>
);

export default Logo;
