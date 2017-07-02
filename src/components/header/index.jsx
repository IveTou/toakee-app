import React, { PropTypes } from 'react';
import { Icon } from 'semantic-ui-react';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Header = ({ title, onIconClick }) => (
  <div className="Header">
    <div className="Header-title">
      <If condition={onIconClick}>
        <Icon className="Header-title-icon" name="sidebar" onClick={onIconClick} />
      </If>
      <span className="Header-title-text">{title}</span>
    </div>
    <div className="Header-arrow" />
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
  onIconClick: PropTypes.func,
};

export default Header;
