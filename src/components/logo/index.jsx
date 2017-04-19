import React from 'react';
import { Link } from 'react-router';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Logo = () => (
  <Link to={{ pathname: '/' }} >
    <img className="Logo" alt="toakee logo" src="https://s3-us-west-2.amazonaws.com/toakee-app-assets/core/images/logo.png" />
  </Link>
);

export default Logo;
