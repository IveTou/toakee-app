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
  modal: {
    paddingTop: 0,
  },
  paperClose: {
    width: closedSideNavWidth,
    overflowX: 'hidden',
  },
  inner: {
    width: sideNavWidth,
  },
  modalHeader: {
    height: topbarHeight,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
    paddingLeft: 0,
    paddingRight: 0,
  },
  userModalHeader: {
    padding: theme.spacing.unit * 2,
    display: 'inline-flex',
  },
  userTitle: {
    height: theme.spacing.unit * 5,
    lineHeight: theme.spacing.unit / 4,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    overflowY: 'hidden',
  },
  categoryHeaderMini: {
    visibility: 'hidden'
  },
  red: { color: red[500] },
  purple: { color: deepPurple[500] },
  blue: { color: lightBlue[500] },
  green: { color: green[500] },
  amber: { color: amber[500] },
  orange: { color: deepOrange[500] },
  blueGrey: { color: blueGrey[500] },
}));
