import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { once } from 'lodash';
import { withRouter } from 'react-router';
import { AppBar, Toolbar, Icon, IconButton, Button } from 'material-ui';
import { compose } from 'recompose';

import { withInfo } from '~/src/hocs';
import { openAuthModal } from '~/src/ducks/auth-modal';
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
    this.props.history.push('/dashboard');
  }

  newEvent() {
    const { viewer, auth } = this.props;
    const pid = (viewer && viewer.id) || null;
    const logged = !!pid;

    TrackingAPI.track({ name: 'New Event Trigger', logged, pid });
    logged ? this.props.history.push('/evento/novo') : auth();
  }

  render() {
    const { classes, viewer = {}, onToggle, small, auth } = this.props;

    return (
      <AppBar className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <IconButton onClick={onToggle}><Icon>menu</Icon></IconButton>
          <Logo small={small} />

          <div className={classes.searchWrapper}>
            <SearchBar onSearch={this.onSearch} />
          </div>

          <Choose>
            <When condition={!small}>
              <div>
                <Button
                  className={classes.publishButton}
                  variant="raised"
                  color="primary"
                  onClick={this.newEvent}
                >
                  Publicar
                </Button>
                <If condition={!viewer.id}>
                  <Button onClick={() => auth('signUp')}>Cadastrar</Button>
                  <Button onClick={() => auth('login')}>Entrar</Button>
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
                login={() => auth('login')}
                signUp={() => auth('signUp')}
                logout={() => this.logout}
                newEvent={() => this.newEvent}
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
  small: PropTypes.bool,
  onToggle: PropTypes.func,
  auth: PropTypes.func,
};

const injectStore = connect(
  ({ authModal }) => authModal.toJS(),
  dispatch => ({
    auth: (mode) => {
      dispatch(openAuthModal(_, mode));
      mode == 'signUp' && TrackingAPI.track({ name: 'Landing SignUp Trigger', pid: 'Guest' });
      mode == 'login' && TrackingAPI.track({ name: 'Landing Login Trigger', pid: 'Guest' });
    },
  }),
);

export default compose(
  withApollo,
  injectStore,
  withRouter,
  withInfo(['viewer']),
  withIndexStyle,
)(TopBar);
