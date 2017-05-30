/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { PropTypes } from 'react';

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
