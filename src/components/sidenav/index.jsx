import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {
  List, ListItem, ListItemIcon, ListItemText, ListSubheader,
  Drawer, Divider, Icon, Avatar, Typography,
} from 'material-ui';
import { compose } from 'recompose';
import { withInfo } from '~/src/hocs';
import Logo from '~/src/components/logo';
import { withIndexStyle } from './styles';

const categories = [
  { title: 'Arte e Cultura', icon: 'color_lens', color: 'red' },
  { title: 'Baladas', icon: 'whatshot', color: 'purple' },
  { title: 'Listas de Desconto', icon: 'loyalty', color: 'green' },
  { title: 'Eventos com Fotos', icon: 'photo_camera', color: 'pink' },
  { title: 'Shows', icon: 'local_activity', color: 'amber' },
  { title: 'Bares e Restaurantes', icon: 'local_bar', color: 'orange' },
  { title: 'Esportes', icon: 'pool', color: 'blueGrey' },
  { title: 'Cursos', icon: 'local_library', color: 'blue' },
];

export class SideNav extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    declare var category;
    const { classes, open, mobile, onToggle, viewer = {} } = this.props;

    const variant = mobile ? 'temporary' : 'permanent';
    const onClose = mobile ? onToggle : undefined;
    const rootClasses = {
      paper: classNames(classes.paper, !open && classes.paperClose, mobile && classes.modal),
      modal: mobile && classes.mobileRoot,
    };

    return (
      <Drawer variant={variant} classes={rootClasses} onClose={onClose} open={open}>
        <If condition={mobile}>
          <div className={viewer.id ? classes.userModalHeader : classes.modalHeader}>
            <Choose>
              <When condition={viewer.id}>
                <Avatar>{viewer.firstName[0]}</Avatar>
                <Typography className={classes.userTitle} variant="title">
                  {viewer.firstName}
                </Typography>
              </When>
              <Otherwise>
                <Logo />
              </Otherwise>
            </Choose>
          </div>
        </If>
        <div role="button" className={classes.inner} onClick={onClose} tabIndex="-1">
          <List component="nav">
            <ListItem button component={Link} to="/">
              <ListItemIcon><Icon>home</Icon></ListItemIcon>
              <ListItemText primary="Início" />
            </ListItem>
            <ListItem button component={Link} to="/meus-eventos">
              <ListItemIcon><Icon>event</Icon></ListItemIcon>
              <ListItemText primary="Meus eventos" />
            </ListItem>
            <Divider />
            <ListSubheader className={open ? undefined : classes.categoryHeaderMini}>
              Categorias
            </ListSubheader>
            <For each="category" of={categories}>
              <ListItem
                button
                key={category.title}
                component={Link}
                to={`/search?q=${category.title}`}
              >
                <ListItemIcon className={classes[category.color]}>
                  <Icon>{category.icon}</Icon>
                </ListItemIcon>
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
  viewer: PropTypes.object,
};

export default compose(
  withIndexStyle,
  withInfo(['viewer']),
)(SideNav);
