import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import autoBind from 'react-autobind';
import { once } from 'lodash';
import { withRouter } from 'react-router';
import {
  Icon,
  Avatar,
  Toolbar,
  IconButton,
  IconMenu,
  Button,
  MenuItem,
} from 'material-ui';
import SearchBar from 'material-ui-search-bar';
import { withInfo } from '~/src/hocs';
import { logout } from '~/src/utils/session';
import TrackingAPI from '~/src/toakee-core/apis/tracking';
import Logo from '~/src/components/logo';

if (process.env.BROWSER) {
  require('./style.scss');
}

const trackPageView = once((viewer, pid) => TrackingAPI.viewerSafeTrack(viewer, pid));

export class TopBar extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = { searchText: '' };
  }

  componentWillReceiveProps({ viewer }) {
    trackPageView(viewer, 'Page View');
  }

  onSearch() {
    this.props.history.push(`/search?q=${this.state.searchText}`);
  }

  onChange(searchText) {
    this.setState({ searchText });
  }

  logout() {
    logout();
    this.props.client.resetStore();
    this.props.history.push('/');
  }

  login() {
    TrackingAPI.track({ name: 'Landing Login Trigger', pid: 'Guest' });
    this.props.history.push('/login');
  }

  signUp() {
    TrackingAPI.track({ name: 'Landing SignUp Trigger', pid: 'Guest' });
    this.props.history.push('/cadastrar');
  }

  dashboard() {
    this.props.history.push('/dashboard');
  }

  newEvent() {
    const { viewer } = this.props;
    const pid = (viewer && viewer.id) || null;
    const logged = !!pid;

    TrackingAPI.track({ name: 'New Event Trigger', logged, pid });
    this.props.history.push('/evento/novo');
  }

  renderAvatar() {
    const { viewer = {} } = this.props;
    return viewer.id
      ? <Avatar className="TopBar-menu-avatar">{viewer.firstName[0]}</Avatar>
      : <Icon>account_circle</Icon>;
  }

  render() {
    const { viewer = {}, onToggle, small } = this.props;

    return (
      <Toolbar className="TopBar">
          <IconButton className="TopBar-nav-button" onClick={onToggle}>
            <Icon>menu</Icon>
          </IconButton>
          <Logo small={small} />

          <SearchBar
            onChange={this.onChange}
            onRequestSearch={this.onSearch}
            hintText="Pesquisar no site"
          />

          <Choose>
            <When condition={!!viewer.id}>
              <IconMenu
                iconButtonElement={<IconButton>{this.renderAvatar()}</IconButton>}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
                <MenuItem onClick={this.dashboard}>Meus eventos</MenuItem>
                <MenuItem onClick={this.newEvent}>Publicar Evento</MenuItem>
                <MenuItem onClick={this.logout}>Sair</MenuItem>
              </IconMenu>
            </When>
            <Otherwise>
              <Choose>
                <When condition={!small}>
                  <Button
                    variant="raised"
                    className="TopBar-menu-button"
                    label="Publicar Evento"
                    onClick={this.newEvent}
                    primary
                  />
                  <Button
                    className="TopBar-menu-button"
                    label="Cadastrar"
                    onClick={this.signUp}
                  />
                  <Button
                    className="TopBar-menu-button"
                    label="Entrar"
                    onClick={this.login}
                  />
                </When>
                <Otherwise>
                  <IconMenu
                    iconButtonElement={<IconButton><Icon>more_vert</Icon></IconButton>}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                  >
                    <MenuItem onClick={this.newEvent}>Publicar Evento</MenuItem>
                    <MenuItem onClick={this.signUp}>Cadastrar</MenuItem>
                    <MenuItem onClick={this.login}>Entrar</MenuItem>
                  </IconMenu>
                </Otherwise>
              </Choose>
            </Otherwise>
          </Choose>
      </Toolbar>
    );
  }
}

TopBar.propTypes = {
  viewer: PropTypes.object,
  history: PropTypes.object,
  client: PropTypes.object,
  small: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default withApollo(withRouter(withInfo(TopBar, ['viewer'])));
