import React, { PropTypes } from 'react';
import { withApollo } from 'react-apollo';
import autoBind from 'react-autobind';
import { once } from 'lodash';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Toolbar,
  ToolbarGroup,
  IconButton,
  IconMenu,
  RaisedButton,
  MenuItem,
} from 'material-ui';
import { NavigationMenu, NavigationMoreVert, SocialPerson } from 'material-ui/svg-icons';
import { deepOrange500, fullWhite } from 'material-ui/styles/colors';
import SearchBar from 'material-ui-search-bar';

import { logout } from '~/src/utils/session';
import TrackingAPI from '~/src/toakee-core/apis/tracking';
import Logo from '~/src/components/logo';
import { withInfo } from '~/src/hocs';

if (process.env.BROWSER) {
  require('./style.scss');
}

const trackPageView = once((viewer, pid) => TrackingAPI.viewerSafeTrack(viewer, pid));

export class TopBar extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = { value: '' };
  }

  componentWillReceiveProps({ viewer }) {
    trackPageView(viewer, 'Page View');
  }

  onSearch() {
    this.props.history.push(`/search?q=${this.state.value}`);
  }

  onChange(value) {
    this.setState({ value });
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

  renderAvatar() {
    const { viewer } = this.props;

    if (viewer && viewer.id) {
      return viewer.photo
        ? <Avatar className="TopBar-avatar" src={viewer.photo} />
        : <Avatar className="TopBar-avatar">{viewer.firstName[0]}</Avatar>;
    }

    return <SocialPerson />;
  }

  render() {
    const { viewer = {} } = this.props;

    return (
      <Toolbar className="TopBar">
        <ToolbarGroup className="ToBar-nav" firstChild>
          <IconButton className="TopBar-nav-button"><NavigationMenu /></IconButton>
          <Logo />
        </ToolbarGroup>
        <ToolbarGroup>
          <SearchBar
            onChange={this.onChange}
            onRequestSearch={this.onSearch}
            hintText="Pesquisar no site"
            style={{ width: '400px', minWidth: '200px' }}
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
                <If condition={viewer.isPromoter}>
                  <MenuItem as={Link} to="/dashboard">
                    Meus eventos
                  </MenuItem>
                </If>
                <MenuItem onClick={this.logout}>Sair</MenuItem>
              </IconMenu>
            </When>
            <Otherwise>
              <Choose>
                <When condition={this.props.deviceInfo.is('desktop')}>
                  <RaisedButton
                    className="TopBar-menu-button signin"
                    label="Cadastrar"
                    onClick={this.signUp}
                    backgroundColor={deepOrange500}
                    labelColor={fullWhite}
                  />
                  <RaisedButton
                    className="TopBar-menu-button login"
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
                    <MenuItem onClick={this.login}>Login</MenuItem>
                    <MenuItem onClick={this.signUp}>Cadastro</MenuItem>
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
  deviceInfo: PropTypes.object,
};

export default withApollo(withRouter(withInfo(TopBar, ['viewer', 'deviceInfo'])));
