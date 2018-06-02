import { withStyles } from 'material-ui';

export const withIndexStyle = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 3,
  },
  notFound: {
    display: 'table',
    textAlign: 'center',
    margin: `${theme.spacing.unit * 8}px auto`,
    [theme.breakpoints.down('sm')]: {
      margin: `${theme.spacing.unit * 3}px auto`,
    }
  },
  shrug: {
    marginBottom: theme.spacing.unit * 3,
  },
  message: {
    color: theme.typography.display1.color,
  },
  eventBox: {
    paddingBottom: theme.spacing.unit * 4,
  },
}));
