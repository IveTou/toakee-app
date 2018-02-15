import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import classNames from 'classnames';
import {
  Drawer,
  Divider,
  Menu,
  MenuItem,
  Subheader,
  Icon,
} from 'material-ui';

if (process.env.BROWSER) {
  require('./style.scss');
}

const categories = [
  {
    title: 'Arte e Cultura',
    icon: <Icon>color_lens</Icon>, // red800
  },
  {
    title: 'Baladas',
    icon: <Icon>whatshot</Icon>, // deeppurple500
  },
  {
    title: 'Cursos',
    icon: <Icon>local_library</Icon>, // lightblue500
  },
  {
    title: 'Esportes',
    icon: <Icon>pool</Icon>, // green500
  },
  {
    title: 'Shows',
    icon: <Icon>local_activity</Icon>, // amber500
  },
  {
    title: 'Bares e Restaurantes',
    icon: <Icon>local_bar</Icon>, // deeporange500
  },
  {
    title: 'Promoções',
    icon: <Icon>loyalty</Icon>, // bluegray500
  },
];

export class SideNav extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    declare var category;
    const { open } = this.props;
    const classes = classNames('SideNav', { 'SideNav--open': open });

    return (
      <Drawer zDepth={0} className={classes} open={open}>
        <Menu>
          <MenuItem
            href="/landing"
            primaryText="Início"
            leftIcon={<Icon>home</Icon>}
          />
          <MenuItem
            href="/dashboard"
            primaryText="Meus Eventos"
            leftIcon={<Icon>event</Icon>}
          />
          <Divider className="SideNav-divider" />
          <Subheader className="SideNav-subheader">Categorias</Subheader>
          <For each="category" of={categories}>
            <MenuItem
              key={category.title}
              href={`/search?q=${category.title}`}
              primaryText={category.title}
              leftIcon={category.icon}
              name={category.title}
            />
          </For>
        </Menu>
      </Drawer>
    );
  }
}

SideNav.propTypes = {
  open: PropTypes.bool,
};

export default SideNav;
