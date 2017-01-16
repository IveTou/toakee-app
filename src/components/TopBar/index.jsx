import React, { PropTypes } from 'react';
import { AppBar } from 'react-toolbox/lib/app_bar';

require('./style.scss');

const TopBar = ({ children, ...props }) => (
  <AppBar {...props} className="TopBar">
    Toakee
    {children}
  </AppBar>
);

TopBar.propTypes = {
  children: PropTypes.node
};

export default TopBar;
