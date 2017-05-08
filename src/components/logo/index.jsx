import React from 'react';
import { Link } from 'react-router';
import config from '~/src/config';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Logo = () => (
  <Link to={{ pathname: '/' }} >
    <img className="Logo" alt="toakee logo" src={`${config.ASSETS_BASE_URI}/core/site/logo.png`} />
  </Link>
);

export default Logo;
