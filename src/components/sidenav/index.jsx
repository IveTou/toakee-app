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
    ids: [
      '5869c086fdec825a1649f3bf', '5869c086fdec825a1649f3c5', '5907e89cb65971000fbffb10',
      '5908412710e01d000fb72d52', '598a3cd828fdb10004071915', '59a6ebba752ee600046ed85a',
      '59a70ac9752ee600046ed889', '59a70ac9752ee600046ed88a', '5a2b77525324240004aa8b84',
      '5a3c01dd3032ce000432e1cd', '5a22d793984a8300042a8b3e', '5a23aba4984a8300042a8d37',
      '5a23aba4984a8300042a8d38', '5a23aba4984a8300042a8d38', '5a295a4bce44b90004a1c4e3',
    ],
  },
  {
    title: 'Baladas',
    icon: <SocialWhatshot color={deepPurple500} />,
    ids: [
      '5869c086fdec825a1649f3c0', '5869c086fdec825a1649f3c4', '5907e89cb65971000fbffb11',
      '5908edd110e01d000fb72d8b', '590a1820cbf3d0000f704f1d', '5a207fed40bdca00049ce645',
      '5a35fdea5a0c8500047600ed', '5a35fdea5a0c8500047600ee', '5a3b60783032ce000432e0fd',
      '5a440183c5ed740004f2335d',
     ],
  },
  {
    title: 'Cursos',
    icon: <MapsLocalLibrary color={lightBlue500} />,
    ids: [
      '59954ab53482a80004c50ddf', '5a2b77525324240004aa8b84', '5a22d0ca49cc5000044a97a5',
      '5a2960e8ce44b90004a1c50d',
    ],
  },
  {
    title: 'Esportes',
    icon: <PlacesPool color={green500} />,
    ids: [
      '5869c086fdec825a1649f3c2', '5976c00afad0ba00049e6443', '5976d53ffad0ba00049e6498',
      '59a6ecdc752ee600046ed85e', '5a3c01dd3032ce000432e1cd', '5a23aba4984a8300042a8d37',
    ],
  },
  {
    title: 'Shows',
    icon: <MapsLocalActivity color={amber500} />,
    ids: [
      '5869c086fdec825a1649f3c5', '5907e89cb65971000fbffb11', '5908edd110e01d000fb72d8b',
      '590a1820cbf3d0000f704f1d', '598a3cd828fdb10004071915', '5a2b844e5324240004aa8b9d',
      '5a35fdea5a0c8500047600ed', '5a35fdea5a0c8500047600ee', '5a3b60783032ce000432e0fd',
      '5a3bf94f3032ce000432e191', '5a239304984a8300042a8cd4',
    ],
  },
  {
    title: 'Bares e Restaurantes',
    icon: <MapsLocalBar color={deepOrange500} />,
    ids: [
      '5869c086fdec825a1649f3c1', '590a6d39cbf3d0000f704f32', '5a146f71524b64000445f699',
      '5a1713f3d3126500041d5569', '5a21c45049cc5000044a9737', '5a21c45049cc5000044a9738',
      '5a239f3d984a8300042a8cfa', '5a440183c5ed740004f2335d',
    ],
  },
  {
    title: 'Promoções',
    icon: <ActionLoyalty color={blueGrey500} />,
    ids: [
      '5a239f3d984a8300042a8cfa', '5a239304984a8300042a8cd4', '5a35f5de5a0c850004760084',
      '5869c086fdec825a1649f3c4',
    ],
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
            leftIcon={<ActionHome />}
          />
          <MenuItem
            href="/dashboard"
            primaryText="Meus Eventos"
            leftIcon={<ActionEvent />}
          />
          <Divider className="SideNav-divider" />
          <Subheader className="SideNav-subheader">Categorias</Subheader>
          <For each="category" of={categories}>
            <MenuItem
              key={category.title}
              href={`/search?q=${category.ids}`}
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
