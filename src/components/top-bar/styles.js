import { withStyles } from 'material-ui';

export const topbarHeight = 64;
export const topbarMobileHeight = 56;

export const withIndexStyle = withStyles(theme => ({
  root: {
    position: 'absolute',
    backgroundColor: theme.palette.common.white,
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    paddingLeft: theme.spacing.unit / 2,
  },
  searchWrapper: {
    flex: 1,
  },
  publishButton: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
  },
}));

