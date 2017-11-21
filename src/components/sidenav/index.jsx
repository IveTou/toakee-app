import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router';
import { Drawer, Divider, Menu, MenuItem, Subheader } from 'material-ui';
import { ActionHome, ActionEvent, SocialPerson } from 'material-ui/svg-icons';
import { Link } from 'react-router-dom';

import { withInfo } from '~/src/hocs';

if (process.env.BROWSER) {
  require('./style.scss');
}

export class SideNav extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  dashboard() {
    this.props.history.push('/dashboard');
  }

  home() {
    this.props.history.push('/');
  }

  render() {
    console.log(this.props.open);
    console.log(this.props.mini);
    return (
      <Drawer
        className="SideNav"
        width={this.props.mini && !this.props.open ? 64 : 256}
        open={!this.props.mini ? this.props.open : undefined}
        containerStyle={{ marginTop: '72px' }}
      >
        <Menu>
          <MenuItem
            onClick={this.home}
            primaryText="Início"
            rightIcon={<ActionHome />}
          />
          <MenuItem
            onClick={this.dashboard}
            primaryText="Meus Eventos"
            rightIcon={<ActionEvent />}
          />
          <Divider />
          <Subheader>Categorias</Subheader>
          <MenuItem primaryText="Arte" rightIcon={<SocialPerson />} />
          <MenuItem primaryText="Baladas" rightIcon={<SocialPerson />} />
          <MenuItem primaryText="Cursos" rightIcon={<SocialPerson />} />
          <MenuItem primaryText="Esporte" rightIcon={<SocialPerson />} />
          <MenuItem primaryText="Shows" rightIcon={<SocialPerson />} />
        </Menu>
      </Drawer>
      );
  }
}

SideNav.propTypes = {
  open: PropTypes.bool,
  mini: PropTypes.bool,
  history: PropTypes.object,
};

export default withApollo(withRouter(SideNav));
