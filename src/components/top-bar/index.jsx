import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { browserHistory } from 'react-router';

import Button from '~/src/components/button';
import Logo from '~/src/components/logo';

import { fetchViewer } from '~/src/toakee-core/ducks/viewer';
import { logout } from '~/src/toakee-core/ducks/auth';

if (process.env.BROWSER) {
  require('./style.scss');
}

export class TopBar extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchViewer());
  }

  logout() {
    this.props.dispatch(logout());
    browserHistory.push('/redirect');
  }

  render() {
    const { viewer } = this.props;
    const avatar = viewer.get('data').size
      ? viewer.get('data').get('photo')
      : null;

    return (
      <header className="TopBar header mdl-layout__header">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">
            <Logo />
          </span>
          <div className="mdl-layout-spacer" />
          <nav className="mdl-navigation" />
          <Button
            id="TopBar-avatar"
            icon="user"
            avatar={avatar}
            fab
          />
          <ul
            className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
            htmlFor="TopBar-avatar"
          >
            <button onClick={this.logout} className="mdl-menu__item">
              Sair
            </button>
          </ul>
        </div>
      </header>
    );
  }
}

TopBar.propTypes = {
  viewer: PropTypes.object,
  dispatch: PropTypes.func,
};


export default connect(
  ({ viewer }) => ({ viewer }),
)(TopBar);
