import { withStyles } from 'material-ui';

export const withIndexStyle = withStyles(theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  icon: {
    marginLeft: theme.spacing.unit,
  }
}));
