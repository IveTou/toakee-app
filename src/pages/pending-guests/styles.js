import { withStyles } from 'material-ui';

export const withIndexStyle = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
  paper: {
    width: `calc(100% - ${theme.spacing.unit * 4})`,
    maxWidth: theme.spacing.unit * 100,
    margin: '0 auto',
  },
  toolbar: {
    backgroundColor: theme.palette.grey[50],
  },
  toolbarSelected: {
    backgroundColor: theme.palette.secondary.light,
  },
}));
