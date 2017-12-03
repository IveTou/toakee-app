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
  List,
  ListItem,
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
const iconStyle = { left: '8px' };
const categories = [
  {
    title: 'Artes',
    icon: <ImageColorLens style={iconStyle} color={red800} />,
  },
  {
    title: 'Baladas',
    icon: <SocialWhatshot style={iconStyle} color={deepPurple500} />,
  },
  {
    title: 'Cursos',
    icon: <MapsLocalLibrary style={iconStyle} color={lightBlue500} />,
  },
  {
    title: 'Esportes',
    icon: <PlacesPool style={iconStyle} color={green500} />,
  },
  {
    title: 'Shows',
    icon: <MapsLocalActivity style={iconStyle} color={yellow500} />,
  },
  {
    title: 'Bares e Restaurantes',
    icon: <MapsLocalBar style={iconStyle} color={deepOrange500} />,
  },
  {
    title: 'Promoções',
    icon: <ActionLoyalty style={iconStyle} color={blueGrey500} />,
  },

];

export class SideNav extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  onItemClick(value) {
    this.props.history.push(`/search?q=${value}`);
  }

  home() {
    this.props.history.push('/');
  }

  dashboard() {
    this.props.history.push('/dashboard');
  }

  renderRows(data) {
    return data.map(row => (
      <ListItem primaryText={row.title} leftIcon={row.icon} onClick={this.onItemClick} />
    ));
  }

  render() {
    const { mini, open } = this.props;
    const isMini = mini && !open;
    const classes = classNames(
      'SideNav',
      { 'SideNav--mini': mini, 'SideNav--mini--closed': isMini },
    );

    return (
      <Drawer
        zDepth={0}
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
          <Divider className="divider" />
          <Subheader className="subheader">Categorias</Subheader>
          <List>{this.renderRows(categories)}</List>
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
