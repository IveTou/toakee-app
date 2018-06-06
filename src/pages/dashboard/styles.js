import { withStyles } from 'material-ui';

export const withIndexStyle = withStyles(theme => ({
  root: {
    display: 'table',
    textAlign: 'center',
    margin: `${theme.spacing.unit * 10}px auto`,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    [theme.breakpoints.up('sm')]: {
      height: '40vh',
    },
  },
  publishButton: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
  },
  caption: {
    color: theme.typography.display4.color,
  }
}));
