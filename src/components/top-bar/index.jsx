import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import autoBind from 'react-autobind';
import { once, debounce } from 'lodash';
import { browserHistory, Link } from 'react-router';
import { Menu, Dropdown, Image, Label, Icon, Button, Search, Visibility } from 'semantic-ui-react';
import classNames from 'classnames';

import { isLogged, logout } from '~/src/utils/session';
import TrackingAPI from '~/src/toakee-core/apis/tracking';
import Logo from '~/src/components/logo';

import query from './graphql';

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

  componentWillReceiveProps({ viewer }) {
    if (!isLogged()) {
      trackPageView('Unlogged Page View', 'Guest');
    } else if (viewer) {
      trackPageView('Logged Page View', viewer.id);
    }
  }

  onSearch(e, q) {
    const currentLocation = browserHistory.getCurrentLocation();
    const pathname = q ? '/search' : '/';
    const method = currentLocation.pathname === pathname
      ? browserHistory.replace
      : browserHistory.push;

    if (e.type === 'focus') {
      if (e.target.value && !currentLocation.pathname !== '/search') {
        method({ pathname: '/search', query: { q: e.target.value } });
      }
    } else {
      method({ pathname, query: q ? { q } : {} });
    }
  }

  handleUpdate = (e, { calculations }) => this.setState({
    transparent: this.props.transparent && !calculations.topPassed,
  });

  logout() {
    logout();
    browserHistory.push('/redirect');
  }

  login() {
    TrackingAPI.track('Landing Login Trigger', 'Guest');
    browserHistory.push('/login');
  }

  signUp() {
    TrackingAPI.track('Landing SignUp Trigger', 'Guest');
    browserHistory.push('/cadastrar');
  }

  renderAvatar() {
    const { viewer } = this.props;

    if (!viewer) {
      return <Icon name="user" circular size="large" color="grey" />;
    }

    return viewer.photo
      ? <Image src={viewer.photo} size="mini" shape="circular" />
      : <Label circular size="big">{viewer.firstName[0]}</Label>;
  }

  render() {
    const { viewer = {} } = this.props;
    const { transparent } = this.state;
    const classes = classNames('TopBar', { 'TopBar--transparent': transparent });

    return (
      <Visibility onUpdate={this.handleUpdate}>
        <Menu fixed="top" className={classes} borderless>
          <Menu.Item className="logo">
            <Logo />
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Search
                onSearchChange={debounce(this.onSearch, 300)}
                open={false}
                onFocus={this.onSearch}
              />
            </Menu.Item>
          </Menu.Menu>
          <Menu.Menu position="right">
            <Choose>
              <When condition={isLogged()}>
                <Dropdown item trigger={this.renderAvatar()} icon={null}>
                  <Dropdown.Menu>
                    <If condition={viewer.isPromoter}>
                      <Dropdown.Item as={Link} to={{ pathname: '/dashboard' }}>
                        Meus eventos
                      </Dropdown.Item>
                    </If>
                    <Dropdown.Item onClick={this.logout}>Sair</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </When>
              <Otherwise>
                <Menu.Item>
                  <Button.Group>
                    <Button onClick={this.login} basic>Entrar</Button>
                    <Button onClick={this.signUp} color="orange">Cadastrar</Button>
                  </Button.Group>
                </Menu.Item>
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
};

export default graphql(query, {
  props: ({ data: { viewer } }) => ({ viewer }),
})(TopBar);
