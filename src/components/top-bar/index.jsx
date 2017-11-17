import React, { PropTypes } from 'react';
import { withApollo } from 'react-apollo';
import autoBind from 'react-autobind';
import { once } from 'lodash';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Image, Label, Icon, Button, Search, Visibility } from 'semantic-ui-react';
import { AppBar, IconButton, RaisedButton, IconMenu, MenuItem, DropDownMenu } from 'material-ui';
import { NavigationClose, MoreVertIcon } from 'material-ui/svg-icons';
import SearchBar from 'material-ui-search-bar';
import classNames from 'classnames';
import qs from 'query-string';

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
    this.state = { transparent: props.transparent };
    autoBind(this);
  }

  componentWillReceiveProps({ viewer, transparent, location }) {
    this._searchInput.setValue(qs.parse(location.search).q || '');
    this.setState({ transparent });
    trackPageView(viewer, 'Page View');
  }

  onSearch(e) {
    if (e.key === 'Enter') {
      this.props.history.push(`/search?q=${e.target.value}`);
    }
  }

  handleUpdate(_, { calculations }) {
    this.setState({ transparent: this.props.transparent && !calculations.topPassed });
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
        ? <Image src={viewer.photo} size="mini" shape="circular" />
        : <Label circular size="big">{viewer.firstName[0]}</Label>;
    }

    return <Icon name="user" circular size="large" color="grey" />;
  }

  render() {
    const { viewer = {} } = this.props;

    return (
      <AppBar
        title={<Logo />}
        titleStyle={{padding: '8px 0'}}
        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
        className="TopBar"
      >
        <SearchBar
          onChange={() => console.log('onChange')}
          onRequestSearch={() => console.log('onRequestSearch')}
        />
        <Choose>
          <When condition={!!viewer.id}>
            <DropDownMenu>
              <If condition={viewer.isPromoter}>
                <MenuItem as={Link} to="/dashboard">
                  Meus eventos
                </MenuItem>
              </If>
              <MenuItem onClick={this.logout}>Sair</MenuItem>
            </DropDownMenu>
          </When>
          <Otherwise>
            <Choose>
              <When condition={this.props.deviceInfo.is('desktop')}>
                <RaisedButton label="Cadastrar" onClick={this.signUp} />
                <RaisedButton label="Entrar" onClick={this.login}/>
              </When>
              <Otherwise>
                <DropDownMenu iconButton={<NavigationClose />}>
                  <MenuItem onClick={this.login}>Login</MenuItem>
                  <MenuItem onClick={this.signUp}>Cadastro</MenuItem>
                </DropDownMenu>
              </Otherwise>
            </Choose>
          </Otherwise>
        </Choose>
      </AppBar>
    );
  }
}

TopBar.propTypes = {
  viewer: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  client: PropTypes.object,
  deviceInfo: PropTypes.object,
};

export default withApollo(withRouter(withInfo(TopBar, ['viewer', 'deviceInfo'])));
