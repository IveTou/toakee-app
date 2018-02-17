import { withStyles } from 'material-ui';

export const withIndexStyle = withStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: theme.spacing.unit * 70,
    margin: 'auto',
    boxShadow: 'none',
    padding: [theme.spacing.unit, theme.spacing.unit * 2, ''].join('px '),
    backgroundColor: theme.palette.grey[100],
  },
}));
