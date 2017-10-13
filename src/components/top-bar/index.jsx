import React, { PropTypes } from 'react';
import { withApollo } from 'react-apollo';
import autoBind from 'react-autobind';
import { once } from 'lodash';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Image, Label, Icon, Button, Search, Visibility } from 'semantic-ui-react';
import classNames from 'classnames';
import qs from 'query-string';

import { deviceInfo } from '~/src/utils/device-info';
import { isLogged, logout } from '~/src/utils/session';
import TrackingAPI from '~/src/toakee-core/apis/tracking';
import Logo from '~/src/components/logo';
import { withViewer } from '~/src/hocs';

if (process.env.BROWSER) {
  require('./style.scss');
}

const trackPageView = once((metric, id) => TrackingAPI.track(metric, id));

export class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { transparent: props.transparent };
    autoBind(this);
  }

  componentWillReceiveProps({ viewer, transparent, location }) {
    this._searchInput.setValue(qs.parse(location.search).q || '');
    this.setState({ transparent });

    if (!isLogged()) {
      trackPageView('Unlogged Page View', 'Guest');
    } else if (viewer) {
      trackPageView('Logged Page View', viewer.id);
    }
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
    TrackingAPI.track('Landing Login Trigger', 'Guest');
    this.props.history.push('/login');
  }

  signUp() {
    TrackingAPI.track('Landing SignUp Trigger', 'Guest');
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
    const { transparent } = this.state;
    const classes = classNames('TopBar', { 'TopBar--transparent': transparent });

    return (
      <Visibility className={classes} onUpdate={this.handleUpdate}>
        <Menu fixed="top" borderless>
          <Menu.Item className="logo">
            <Logo />
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Search
                ref={(node) => { this._searchInput = node; }}
                open={false}
                onFocus={this.onSearch}
                input={{ icon: 'search', onKeyPress: this.onSearch }}
              />
            </Menu.Item>
          </Menu.Menu>
          <Menu.Menu position="right">
            <Choose>
              <When condition={!!viewer.id}>
                <Dropdown item trigger={this.renderAvatar()} icon={null}>
                  <Dropdown.Menu>
                    <If condition={viewer.isPromoter}>
                      <Dropdown.Item as={Link} to="/dashboard">
                        Meus eventos
                      </Dropdown.Item>
                    </If>
                    <Dropdown.Item onClick={this.logout}>Sair</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </When>
              <Otherwise>
                <Choose>
                  <When condition={deviceInfo().isDesktop}>
                    <Menu.Item>
                      <Button.Group>
                        <Button
                          className="TopBar-login"
                          onClick={this.login}
                          basic
                          color="orange"
                        >
                          Entrar
                        </Button>
                        <Button
                          onClick={this.signUp}
                          color="orange"
                        >
                          Cadastrar
                        </Button>
                      </Button.Group>
                    </Menu.Item>
                  </When>
                  <Otherwise>
                    <Dropdown item icon="ellipsis vertical" simple>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={this.login}>Entrar</Dropdown.Item>
                        <Dropdown.Item onClick={this.signUp}>Cadastrar</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Otherwise>
                </Choose>
              </Otherwise>
            </Choose>
          </Menu.Menu>
        </Menu>
      </Visibility>
    );
  }
}

TopBar.propTypes = {
  viewer: PropTypes.object,
  transparent: PropTypes.bool,
  history: PropTypes.object,
  location: PropTypes.object,
  client: PropTypes.object,
};

export default withApollo(withRouter(withViewer(TopBar)));
