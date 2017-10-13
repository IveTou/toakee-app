import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import config from '~/src/config';
import { deviceInfo } from '~/src/utils/device-info';

if (process.env.BROWSER) {
  require('./style.scss');
}

const logoImg = () => (
  deviceInfo().isDesktop
    ? `${config.ASSETS_BASE_URI}/core/site/logo.png`
    : `${config.ASSETS_BASE_URI}/core/site/logo-x64.png`
);

const classes = () => classNames('Logo', { 'Logo--small': !deviceInfo().isDesktop });

const Logo = () => (
  <Link to="/">
    <img className={classes()} alt="toakee logo" src={logoImg()} />
  </Link>
);

export default Logo;
