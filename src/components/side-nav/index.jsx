import React, { PropTypes } from 'react';
import { Icon, Menu } from 'semantic-ui-react';

if (process.env.BROWSER) {
  require('./style.scss');
}


export class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'home' };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const {activeItem} = this.state;

    return (
      <Menu vertical className="SideNav">
        <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleItemClick}>
          <Icon name="home" />
          Início
        </Menu.Item>
        <Menu.Item name="events" active={activeItem === 'events'} onClick={this.handleItemClick}>
          <Icon name="calendar outline" />
          Meus Eventos
        </Menu.Item>
      </Menu>
    )
  }
}


export default SideNav;
