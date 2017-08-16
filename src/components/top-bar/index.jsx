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

  componentWillReceiveProps({ viewer, transparent }) {
    this._searchInput.setValue(browserHistory.getCurrentLocation().query.q || '');
    this.setState({ transparent });

    if (!isLogged()) {
      trackPageView('Unlogged Page View', 'Guest');
    } else if (viewer) {
      trackPageView('Logged Page View', viewer.id);
    }
  }

  onSearch(e) {
    if (e.key === 'Enter') {
      browserHistory.push({ pathname: '/search', query: { q: e.target.value } });
    }
  }

  handleUpdate(_, { calculations }) {
    this.setState({ transparent: this.props.transparent && !calculations.topPassed });
  }

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
    const searchDefaultValue = browserHistory.getCurrentLocation().query.q;

    return (
      <Visibility className={classes} onUpdate={this.handleUpdate}>
        <Menu fixed="top" borderless>
          <Menu.Item className="logo">
            <Logo />
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Search
                ref={(node) => { this._searchInput = node; } }
                open={false}
                onFocus={this.onSearch}
                input={{ icon: 'search', onKeyPress: this.onSearch }}
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
