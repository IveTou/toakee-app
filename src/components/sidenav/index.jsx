import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classNames from 'classnames';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router';
import {
  Avatar,
  Drawer,
  Divider,
  Menu,
  MenuItem,
  Subheader,
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
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
  black,
  white,
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

const tableData = [
  {
    title: 'Artes',
    icon: <ImageColorLens />,
    color: black,
    backgroundColor: red800,
  },
  {
    title: 'Baladas',
    icon: <SocialWhatshot />,
    color: black,
    backgroundColor: deepPurple500,
  },
  {
    title: 'Cursos',
    icon: <MapsLocalLibrary />,
    backgroundColor: lightBlue500,
  },
  {
    title: 'Esportes',
    icon: <PlacesPool />,
    color: black,
    backgroundColor: green500,
  },
  {
    title: 'Shows',
    icon: <MapsLocalActivity />,
    color: black,
    backgroundColor: yellow500,
  },
  {
    title: 'Gastronomia',
    icon: <MapsLocalBar />,
    color: black,
    backgroundColor: deepOrange500,
  },
  {
    title: 'Promoções',
    icon: <ActionLoyalty />,
    color: black,
    backgroundColor: blueGrey500,
  },

];

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

  renderRows(data) {
    return data.map((row, idx) => (
        <TableRow style={{ color: row.color }}>
          <TableRowColumn
            style={{ padding: '8px', width: '48px' }}
          >
            <Avatar icon={row.icon} backgroundColor={row.backgroundColor} />
          </TableRowColumn>
          <TableRowColumn style={{ fontSize: '16px' }}>{row.title}</TableRowColumn>
        </TableRow>
      )
    );
  }

  render() {
    const { mini, open } = this.props;
    const isMini = mini && !open;
    const classes = classNames(
        'SideNav',
        { 'SideNav--mini': mini, 'SideNav--mini--closed': isMini}
    );

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
          <Subheader className="subheader">Categorias</Subheader>
          <Table selectable multiSelectable>
            <TableBody deselectOnClickaway={false} displayRowCheckbox={false} showRowHover>
              {this.renderRows(tableData)}
            </TableBody>
          </Table>
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
