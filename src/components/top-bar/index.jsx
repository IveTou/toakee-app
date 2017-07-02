import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import autoBind from 'react-autobind';
import { browserHistory, Link } from 'react-router';
import { Menu, Dropdown, Image, Label, Icon, Button } from 'semantic-ui-react';

import { isLogged, logout } from '~/src/utils/session';
import TrackingAPI from '~/src/toakee-core/apis/tracking';

import Logo from '~/src/components/logo';

if (process.env.BROWSER) {
  require('./style.scss');
}

const query = gql`
  query { viewer { id, firstName, photo, isPromoter } }
`;

export class TopBar extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
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

    return (
      <Menu fixed="top" className="TopBar" borderless>
        <Menu.Item>
          <Logo />
        </Menu.Item>
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
    );
  }
}

TopBar.propTypes = {
  viewer: PropTypes.object,
};

export default graphql(query, {
  props: ({ data: { viewer } }) => ({ viewer }),
})(TopBar);
