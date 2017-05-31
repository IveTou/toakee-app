import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import { toggleDashboard } from '~/src/toakee-core/ducks/dashboard';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Header = ({ title, onIconClick }) => (
  <div className="Header">
    <div className="Header-title">
      <Icon className="Header-title-icon" name="sidebar" onClick={onIconClick} />
      <span className="Header-title-text">{title}</span>
    </div>
    <div className="Header-arrow" />
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
  onIconClick: PropTypes.func,
};

export default connect(
  () => ({}),
  dispatch => ({ onIconClick: () => dispatch(toggleDashboard()) }),
)(Header);
