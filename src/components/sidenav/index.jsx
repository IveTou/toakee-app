import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {
  List, ListItem, ListItemIcon, ListItemText, ListSubheader,
  Drawer, Divider, Icon,
} from 'material-ui';

import { withIndexStyle } from './styles';

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
    const { classes, open, mobile, onToggle } = this.props;

    const variant = mobile ? 'temporary' : 'permanent';
    const onClose = mobile ? onToggle : undefined;
    const rootClasses = {
      paper: classNames(classes.paper, !open && classes.paperClose),
      modal: mobile && classes.mobileRoot,
    };

    return (
      <Drawer variant={variant} classes={rootClasses} onClose={onClose} open={open}>
        <div role="button" className={classes.inner} onClick={onClose}>
          <List component="nav">
            <ListItem button component={Link} to="/">
              <ListItemIcon><Icon>home</Icon></ListItemIcon>
              <ListItemText primary="Início" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard">
              <ListItemIcon><Icon>event</Icon></ListItemIcon>
              <ListItemText primary="Meus eventos" />
            </ListItem>
            <Divider />
            <If condition={open}>
              <ListSubheader>Categorias</ListSubheader>
            </If>
            <For each="category" of={categories}>
              <ListItem
                button
                key={category.title}
                component={Link}
                to={`/search?q=${category.title}`}
              >
                <ListItemIcon>{category.icon}</ListItemIcon>
                <ListItemText primary={category.title} />
              </ListItem>
            </For>
          </List>
        </div>
      </Drawer>
    );
  }
}

SideNav.propTypes = {
  classes: PropTypes.object,
  mobile: PropTypes.bool,
  onToggle: PropTypes.func,
  open: PropTypes.bool,
};

export default withIndexStyle(SideNav);
