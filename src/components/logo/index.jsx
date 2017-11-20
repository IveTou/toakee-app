import React from 'react';
import { Link } from 'react-router-dom';

import config from '~/src/config';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Logo = () => {
  const imgSrc = `${config.ASSETS_BASE_URI}/core/site/logo-orange.png`;

  return (
    <Link className="Logo" alt="toakee logo" to="/">
      <img src={imgSrc} />
      <h1>Toakee</h1>
    </Link>
  );
};

export default Logo;
