import React from 'react';
import Drawer from 'react-toolbox/lib/drawer';
require('./style.scss');

class DrawerTest extends React.Component {
  state = {
    active: false
  };

  handleToggle = () => {
    this.setState({active: !this.state.active});
  };

  render () {
    return (
      <div>
        <Drawer active={this.state.active} onOverlayClick={this.handleToggle}>
          <h5>This is your Drawer.</h5>
          <p>You can embed any content you want, for example a Menu.</p>
        </Drawer>
      </div>
    );
  }
}