import { withStyles } from 'material-ui';

export const topbarHeight = 64;
export const topbarMobileHeight = 56;

export const withIndexStyle = withStyles(theme => ({
  root: {
    position: 'absolute',
    backgroundColor: theme.palette.common.white,
    zIndex: theme.zIndex.drawer + 100,
  },
  toolbar: {
    paddingLeft: theme.spacing.unit / 2,
  },
  searchWrapper: {
    flex: 1,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  publishButton: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
  },
}));

