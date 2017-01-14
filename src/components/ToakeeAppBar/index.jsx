import React, { PropTypes } from 'react';
import { AppBar } from 'react-toolbox/app_bar';
import theme from './style.scss';

const ToakeeAppBar = ({ children, ...other }) => (
  <AppBar {...other} theme={theme}>
    App Example
    {children}
  </AppBar>
);

ToakeeAppBar.propTypes = {
  children: PropTypes.node
};

export default ToakeeAppBar;
