import { withStyles } from 'material-ui';

export const withIndexStyle = withStyles(theme => ({
  root: {
    margin: `${theme.spacing.unit * 2}px auto`,
    marginBottom: theme.spacing.unit * 4,
    padding: theme.spacing.unit * 2,
    paddingTop: 0,
    maxWidth: theme.spacing.unit * 108,
  },
  list: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  listItem: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  }
}));
