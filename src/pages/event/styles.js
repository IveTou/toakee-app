import { withStyles } from 'material-ui';

export const withIndexStyle = withStyles(theme => ({
  root: {
    margin: '0 auto',
    maxWidth: theme.spacing.unit * 100,
  },
  media: {
    height: theme.spacing.unit * 40,
  },
  calendar: {
    float: 'left',
    marginRight: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    borderRight: '2px solid rgba(0, 0, 0,.13)',
    color: 'rgba(0, 0, 0,.54)',
  },
}));

