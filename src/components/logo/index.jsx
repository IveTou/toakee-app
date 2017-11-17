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
    ? `${config.ASSETS_BASE_URI}/core/site/logo-orange.png`
    : `${config.ASSETS_BASE_URI}/core/site/logo-x64.png`;
  return <Link to="/"><img className="Logo" alt="toakee logo" src={imgSrc} /></Link>;
};

Logo.propTypes = {
  deviceInfo: PropTypes.object.isRequired,
};

export default withInfo(Logo, ['deviceInfo']);
