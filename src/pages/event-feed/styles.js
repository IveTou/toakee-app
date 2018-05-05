import { withStyles } from 'material-ui';

export const withIndexStyle = withStyles(theme => ({
  banner: {
    backgroundColor: theme.palette.grey[50],
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  list: {
    padding: theme.spacing.unit,
  },
}));
