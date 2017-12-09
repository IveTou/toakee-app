import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classNames from 'classnames';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router';
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
  yellow500,
  deepOrange500,
  blueGrey500,
} from 'material-ui/styles/colors';

if (process.env.BROWSER) {
  require('./style.scss');
}

declare var category;

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
    icon: <MapsLocalActivity color={yellow500} />,
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

  onItemClick(e, item) {
    if (item.props.name) {
      this.props.history.push(`/search?q=${item.props.name}`);
    }
  }

  render() {
    const { open } = this.props;
    const classes = classNames('SideNav', { 'SideNav--open': open });

    return (
      <Drawer zDepth={0} className={classes} open={open}>
        <Menu onItemTouchTap={this.onItemClick}>
          <MenuItem
            href={'/landing'}
            primaryText="Início"
            leftIcon={<ActionHome />}
          />
          <MenuItem
            href={'/dashboard'}
            onClick={this.dashboard}
            primaryText="Meus Eventos"
            leftIcon={<ActionEvent />}
          />
          <Divider className="SideNav-divider" />
          <Subheader className="SideNav-subheader">Categorias</Subheader>
          <For each="category" of={categories}>
            <MenuItem
              key={category.title}
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
  history: PropTypes.object,
};

export default withApollo(withRouter(SideNav));
