import React, { PropTypes } from 'react';

if (process.env.BROWSER) {
  require('./style.scss');
}

const TopBar = ({ children }) => (
  <div className="TopBar">{children}</div>
);

TopBar.propTypes = {
  children: PropTypes.node,
};

export default TopBar;
