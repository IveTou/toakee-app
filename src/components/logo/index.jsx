import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import config from '~/src/config';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Logo = ({ small }) => {
  const imgSrc = small
    ? `${config.ASSETS_BASE_URI}/core/site/logo-x64.png`
    : `${config.ASSETS_BASE_URI}/core/site/logo.png`;
  const classes = classNames('Logo', { 'Logo--small': small });

  return <Link className={classes} to="/"><img alt="toakee logo" src={imgSrc} /></Link>;
};

Logo.propTypes = {
  small: PropTypes.bool.isRequired,
};

export default Logo;
