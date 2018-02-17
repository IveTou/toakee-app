import { withStyles } from 'material-ui';
import { topbarHeight } from '~/src/components/top-bar/styles';

const sideNavWidth = 240;
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
    borderRight: 'none',
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
}));
