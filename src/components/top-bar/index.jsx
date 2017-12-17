import React, { PropTypes } from 'react';
import { withApollo } from 'react-apollo';
import autoBind from 'react-autobind';
import { once } from 'lodash';
import { withRouter } from 'react-router';
import {
  Avatar,
  Toolbar,
  ToolbarGroup,
  IconButton,
  IconMenu,
  RaisedButton,
  FlatButton,
  MenuItem,
} from 'material-ui';
import { NavigationMenu, NavigationMoreVert, ActionAccountCircle } from 'material-ui/svg-icons';
import SearchBar from 'material-ui-search-bar';
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
    const { viewer } = this.props;

    if (viewer && viewer.id) {
      return viewer.photo
        ? <Avatar className="TopBar-avatar" src={viewer.photo} />
        : <Avatar className="TopBar-avatar">{viewer.firstName[0]}</Avatar>;
    }

    return <ActionAccountCircle />;
  }

  render() {
    const { viewer = {}, onToggle, small } = this.props;

    return (
      <Toolbar className="TopBar">
        <ToolbarGroup className="TopBar-nav" firstChild>
          <IconButton
            className="TopBar-nav-button"
            onClick={onToggle}
          >
            <NavigationMenu />
          </IconButton>
          <Logo small={small} />
        </ToolbarGroup>
        <ToolbarGroup className="TopBar-search">
          <SearchBar
            onChange={this.onChange}
            onRequestSearch={this.onSearch}
            hintText="Pesquisar no site"
          />
        </ToolbarGroup>
        <ToolbarGroup className="TopBar-menu" lastChild>
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
                  <RaisedButton
                    className="TopBar-menu-button"
                    label="Publicar Evento"
                    onClick={this.newEvent}
                    primary
                  />
                  <FlatButton
                    className="TopBar-menu-button"
                    label="Cadastrar"
                    onClick={this.signUp}
                  />
                  <FlatButton
                    className="TopBar-menu-button"
                    label="Entrar"
                    onClick={this.login}
                  />
                </When>
                <Otherwise>
                  <IconMenu
                    iconButtonElement={<IconButton><NavigationMoreVert /></IconButton>}
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
        </ToolbarGroup>
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

export default withApollo(withRouter(TopBar));
