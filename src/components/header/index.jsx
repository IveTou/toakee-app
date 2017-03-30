import React, { PropTypes } from 'react';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Header = ({ title }) => (
  <div className="Header">
    <div className="Header-title">{title}</div>
    <div className="Header-arrow" />
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
