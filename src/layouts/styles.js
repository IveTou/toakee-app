import { withStyles } from 'material-ui';
import { topbarHeight, topbarMobileHeight } from '~/src/components/top-bar/styles';

export const withDefaultStyle = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  main: {
    width: '100%',
    overflowY: 'auto',
    flexGrow: 1,
    height: `calc(100% - ${topbarMobileHeight}px)`,
    marginTop: topbarMobileHeight,
    [theme.breakpoints.up('sm')]: {
      height: `calc(100% - ${topbarHeight}px)`,
      marginTop: topbarHeight,
    },
  },
}));
