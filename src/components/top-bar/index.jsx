import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { browserHistory, Link } from 'react-router';

import Button from '~/src/components/button';
import Logo from '~/src/components/logo';

import { isLogged } from '~/src/utils/session';
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
    if (isLogged()) {
      this.props.dispatch(fetchViewer());
    }
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
          <Choose>
            <When condition={isLogged()}>
              <Button
                className="TopBar-avatar"
                id="TopBar-avatar"
                icon="user"
                avatar={avatar}
                fab
              />
              <ul
                className="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect"
                htmlFor="TopBar-avatar"
              >
                <button onClick={this.logout} className="mdl-menu__item">
                  Sair
                </button>
              </ul>
            </When>
            <Otherwise>
              <Link to={{ pathname: '/login' }}>
                <Button className="header-action" label="Entrar" raised ripple accent />
              </Link>
            </Otherwise>
          </Choose>
          <div className="mdl-layout-spacer" />
          <span className="mdl-layout-title">
            <Logo />
          </span>
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
