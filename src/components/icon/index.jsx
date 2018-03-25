/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Icon = ({ icon, onClick, className }) => (
  <i className={`Icon fa fa-${icon} ${className}`} onClick={onClick} />
);

Icon.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Icon;
