/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { PropTypes } from 'react';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Icon = ({ icon, onClick }) => (
  <i className={`Icon fa fa-${icon}`} onClick={onClick} />
);

Icon.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

export default Icon;
