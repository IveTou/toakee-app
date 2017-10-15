import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import config from '~/src/config';
import { withInfo } from '~/src/hocs';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Logo = ({ deviceInfo }) => {
  const imgSrc = deviceInfo.is('desktop')
    ? `${config.ASSETS_BASE_URI}/core/site/logo.png`
    : `${config.ASSETS_BASE_URI}/core/site/logo-x64.png`;
  const classes = classNames('Logo', { 'Logo--small': !deviceInfo.is('desktop') });

  return <Link to="/"><img className={classes} alt="toakee logo" src={imgSrc} /></Link>;
};

Logo.propTypes = {
  deviceInfo: PropTypes.object.isRequired,
};

export default withInfo(Logo, ['deviceInfo']);
