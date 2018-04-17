import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import config from '~/src/config';

import { withIndexStyle } from './styles';

const Logo = ({ classes, size, compact }) => {
  const imgSrc = compact
    ? `${config.ASSETS_BASE_URI}/core/site/logo-x64.png`
    : `${config.ASSETS_BASE_URI}/core/site/logo.png`;
  const rootClasses = classNames(classes.root, compact && classes.rootCompact);
  const imageClasses = classNames(classes.image,compact && classes.imageCompact);

  return(
    <Link className={rootClasses} to="/">
      <img className={imageClasses} alt="toakee logo" src={imgSrc} style={{ width: size }} />
    </Link>
  );
};

Logo.propTypes = {
  compact: PropTypes.bool,
  classes: PropTypes.object,
  size: PropTypes.number,
};

export default withIndexStyle(Logo);
