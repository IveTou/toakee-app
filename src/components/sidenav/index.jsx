import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classNames from 'classnames';
import {
  Drawer,
  Divider,
  Menu,
  MenuItem,
  Subheader,
} from 'material-ui';
import {
  ActionHome,
  ActionEvent,
  ActionLoyalty,
  ImageColorLens,
  MapsLocalActivity,
  MapsLocalBar,
  MapsLocalLibrary,
  PlacesPool,
  SocialWhatshot,
} from 'material-ui/svg-icons';
import {
  red800,
  deepPurple500,
  lightBlue500,
  green500,
  amber500,
  deepOrange500,
  blueGrey500,
} from 'material-ui/styles/colors';

if (process.env.BROWSER) {
  require('./style.scss');
}

const categories = [
  {
    title: 'Arte e Cultura',
    icon: <ImageColorLens color={red800} />,
  },
  {
    title: 'Baladas',
    icon: <SocialWhatshot color={deepPurple500} />,
  },
  {
    title: 'Cursos',
    icon: <MapsLocalLibrary color={lightBlue500} />,
  },
  {
    title: 'Esportes',
    icon: <PlacesPool color={green500} />,
  },
  {
    title: 'Shows',
    icon: <MapsLocalActivity color={amber500} />,
  },
  {
    title: 'Bares e Restaurantes',
    icon: <MapsLocalBar color={deepOrange500} />,
  },
  {
    title: 'Promoções',
    icon: <ActionLoyalty color={blueGrey500} />,
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
            href={"/landing"}
            primaryText="Início"
            leftIcon={<ActionHome />}
          />
          <MenuItem
            href={"/dashboard"}
            primaryText="Meus Eventos"
            leftIcon={<ActionEvent />}
          />
          <Divider className="SideNav-divider" />
          <Subheader className="SideNav-subheader">Categorias</Subheader>
          <For each="category" of={categories}>
            <MenuItem
              key={category.title}
              href={'/search?q=${item.props.name}'}
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
