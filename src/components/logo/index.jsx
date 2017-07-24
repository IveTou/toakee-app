import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import config from '~/src/config';
import { deviceInfo } from '~/src/utils/device-info';

if (process.env.BROWSER) {
  require('./style.scss');
}

const logoImg = deviceInfo.isDesktop
  ? `${config.ASSETS_BASE_URI}/core/site/logo.png`
  : '/imgs/topbar-logo.png';

const classes = classNames('Logo', { 'Logo--small': !deviceInfo.isDesktop });

const Logo = () => (
  <Link to={{ pathname: '/' }} >
    <img className={classes} alt="toakee logo" src={logoImg} />
  </Link>
);

export default Logo;
