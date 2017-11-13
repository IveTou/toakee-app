import React, { PropTypes } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import classNames from 'classnames';

if (process.env.BROWSER) {
  require('./style.scss');
}


export class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'home' };
  }

  handleItemClick(e, { name }) {
		this.setState({ activeItem: name });
	}

  render() {
    const { activeItem } = this.state;
    const { hidden, partial } = this.props;
    const classes = classNames(
			'SideNav',
			{ 'SideNav--hidden': hidden },
			{ 'SideNav--hidden--partial': partial},
		);

    return (
      <Menu vertical className={classes}>
        <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleItemClick}>
          <Icon name="home" size="large" />
          <div className="title">Início</div>
        </Menu.Item>
        <Menu.Item name="events" active={activeItem === 'events'} onClick={this.handleItemClick}>
          <Icon name="calendar outline" size="large" />
          <div className="title">Meus Eventos</div>
        </Menu.Item>	
      </Menu>
    );
  }
}

SideNav.propTypes = {
  hidden: PropTypes.bool,
	partial: PropTypes.bool,
};

export default SideNav;
