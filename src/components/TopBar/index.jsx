import React, { PropTypes } from 'react';
import { AppBar } from 'react-toolbox/app_bar';
import theme from './style.scss';

const TopBar = ({ children, ...other }) => (
	<div className="appBar">
		<AppBar {...other} theme={theme}>
	    App Example
	    {children}
		</AppBar>
	</div>
);

TopBar.propTypes = {
children: PropTypes.node
};

export default TopBar;
