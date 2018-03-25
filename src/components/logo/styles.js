import { withStyles } from 'material-ui';

export const withIndexStyle = withStyles(theme => ({
  root: {
    margin: 0,
    marginRight: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 2,
  },
  rootSmall: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
  image: {
    width: theme.spacing.unit * 20,
  },
  imageSmall: {
    width: theme.spacing.unit * 5,
  },
}));
