import React, { PropTypes } from 'react';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Header = ({ title }) => (
  <div className="Header">{title}</div>
);

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
