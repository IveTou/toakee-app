import { withStyles } from 'material-ui';
import { topbarHeight } from '~/src/components/top-bar/styles';
import {
  red, deepPurple, lightBlue, green, amber, deepOrange, blueGrey,
} from 'material-ui/colors';

const sideNavWidth = 280;
const closedSideNavWidth = 60;

export const withIndexStyle = withStyles(theme => ({
  mobileRoot: {
    width: 'auto',
  },
  paper: {
    position: 'relative',
    height: '100%',
    width: sideNavWidth,
    paddingTop: topbarHeight,
    backgroundColor: theme.palette.grey[100],
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  paperClose: {
    width: closedSideNavWidth,
    overflowX: 'hidden',
  },
  inner: {
    width: sideNavWidth,
  },
  red: { color: red[500] },
  purple: { color: deepPurple[500] },
  blue: { color: lightBlue[500] },
  green: { color: green[500] },
  amber: { color: amber[500] },
  orange: { color: deepOrange[500] },
  blueGrey: { color: blueGrey[500] },
}));
