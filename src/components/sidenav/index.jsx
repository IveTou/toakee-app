import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classNames from 'classnames';
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

  renderMenuItem() {
    if(this.props.mini && !this.props.open) {
    } else {
    }
  }

  render() {
    const { mini, open } = this.props;
    const classes = classNames('SideNav', { 'SideNav--mini': mini });
    const isMini = mini && !open;

    return (
      <Drawer
        className={classes}
        width={isMini ? 64 : 256}
        open={!mini ? open : undefined}
        containerStyle={{ marginTop: '72px' }}
      >
        <Menu>
          <MenuItem
            onClick={this.home}
            primaryText="Início"
            leftIcon={<ActionHome />}
          />
          <MenuItem
            onClick={this.dashboard}
            primaryText="Meus Eventos"
            leftIcon={<ActionEvent />}
          />
          <Divider />
          <Subheader>Categorias</Subheader>
          <MenuItem primaryText="Arte" leftIcon={<SocialPerson />} />
          <MenuItem primaryText="Baladas" leftIcon={<SocialPerson />} />
          <MenuItem primaryText="Cursos" leftIcon={<SocialPerson />} />
          <MenuItem primaryText="Esporte" leftIcon={<SocialPerson />} />
          <MenuItem primaryText="Shows" leftIcon={<SocialPerson />} />
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
