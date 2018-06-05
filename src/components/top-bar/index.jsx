import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import autoBind from 'react-autobind';
import { once } from 'lodash';
import { withRouter } from 'react-router';
import { AppBar, Toolbar, Icon, IconButton, Button } from 'material-ui';
import { compose } from 'recompose';

import { withInfo } from '~/src/hocs';
import { withAuth } from '~/src/components/auth-modal/hoc';
import { logout } from '~/src/utils/session';
import TrackingAPI from '~/src/toakee-core/apis/tracking';
import Logo from '~/src/components/logo';
import SearchBar from '~/src/components/search-bar';

import TopBarAvatar from './avatar';
import TopBarMore from './more';
import { withIndexStyle } from './styles';

const trackPageView = once((viewer, pid) => TrackingAPI.viewerSafeTrack(viewer, pid));

export class TopBar extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillReceiveProps({ viewer }) {
    trackPageView(viewer, 'Page View');
  }

  onSearch(value) {
    this.props.history.push(`/search?q=${value}`);
  }

  logout() {
    logout();
    this.props.client.resetStore();
    this.props.history.push('/');
  }

  dashboard() {
    this.props.history.push('/meus-eventos');
  }

  render() {
    const { classes, viewer = {}, onToggle, mobile, requireLogin } = this.props;
    const pid = (viewer && viewer.id) || null;
    const logged = !!pid;

    const login = () => {
      TrackingAPI.track({ name: 'LoginTrigger.Clicked', pid: 'Guest' });
      requireLogin(() => {
        TrackingAPI.track({ name: 'User.Logged', pid });
        window.redirect = '/';
      })();
    }

    const signUp = () => {
      TrackingAPI.track({ name: 'SignUpTrigger.Clicked', pid: 'Guest' });
      requireLogin(() => {
        TrackingAPI.track({ name: 'User.SignedUp', pid });
        window.redirect = '/';
      }, 'signUp')();
    }

    const newEvent = () => {
      TrackingAPI.track({ name: 'EventTrigger.Clicked', logged, pid });
      logged
        ? this.props.history.push('/evento/novo')
        : requireLogin(() => {
          TrackingAPI.track({ name: 'User.Logged', pid });
          this.props.history.push('/evento/novo');
        })();
    }

    return (
      <AppBar className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <IconButton onClick={onToggle}><Icon>menu</Icon></IconButton>
          <Logo compact={mobile} />

          <div className={classes.searchWrapper}>
            <SearchBar onSearch={this.onSearch} />
          </div>

          <Choose>
            <When condition={!mobile}>
              <div>
                <Button
                  className={classes.publishButton}
                  variant="raised"
                  color="primary"
                  onClick={newEvent}
                >
                  Publicar
                </Button>
                <If condition={!viewer.id}>
                  <Button onClick={signUp}>Cadastrar</Button>
                  <Button onClick={login}>Entrar</Button>
                </If>
              </div>

              <TopBarAvatar
                viewer={viewer}
                logout={() => this.logout}
                dashboard={() => this.dashboard}
              />
            </When>
            <Otherwise>
              <TopBarMore
                viewer={viewer}
                login={login}
                signUp={signUp}
                logout={this.logout}
                newEvent={newEvent}
              />
            </Otherwise>
          </Choose>
        </Toolbar>
      </AppBar>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object,
  viewer: PropTypes.object,
  history: PropTypes.object,
  client: PropTypes.object,
  mobile: PropTypes.bool,
  onToggle: PropTypes.func,
  requireLogin: PropTypes.func,
};

export default compose(
  withApollo,
  withRouter,
  withAuth,
  withInfo(['viewer']),
  withIndexStyle,
)(TopBar);
