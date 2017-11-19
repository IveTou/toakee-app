import React, { PropTypes } from 'react';
import { withApollo } from 'react-apollo';
import autoBind from 'react-autobind';
import { once } from 'lodash';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Image, Label, Icon, Button, Search, Visibility } from 'semantic-ui-react';
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
        ? <Image src={viewer.photo} size="mini" shape="circular" />
        : <Label circular size="big">{viewer.firstName[0]}</Label>;
    }

    return <Icon name="user" circular size="large" color="grey" />;
  }

  render() {
    const { viewer = {} } = this.props;
    const { transparent } = this.state;
    const classes = classNames('TopBar', { 'TopBar--transparent': transparent });
    const isDesktop = this.props.deviceInfo.is('desktop');

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
                <If condition={isDesktop}>
                  <Menu.Item>
                    <Button
                      className="TopBar-newEvent"
                      onClick={this.newEvent}
                      color="orange"
                      basic
                    >
                      Publicar Evento
                    </Button>
                  </Menu.Item>
                </If>
                <Dropdown item trigger={this.renderAvatar()} icon={null}>
                  <Dropdown.Menu>
                    <If condition={!isDesktop}>
                      <Dropdown.Item onClick={this.newEvent}>
                        Publicar Evento
                      </Dropdown.Item>
                    </If>
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
                  <When condition={isDesktop}>
                    <Menu.Item>
                      <Button
                        className="TopBar-newEvent"
                        onClick={this.newEvent}
                        basic
                        color="orange"
                      >
                        Publicar Evento
                      </Button>
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
                        <Dropdown.Item onClick={this.newEvent}>
                          Publicar Evento
                        </Dropdown.Item>
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
  deviceInfo: PropTypes.object,
};

export default withApollo(withRouter(withInfo(TopBar, ['viewer', 'deviceInfo'])));
