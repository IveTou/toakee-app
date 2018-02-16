import { withStyles } from 'material-ui';

export const withIndexStyle = withStyles(theme => ({
  title: {
    marginLeft: theme.spacing.unit,
  },
  list: {
    display: 'flex',
    overflow: 'hidden',
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    [theme.breakpoints.down('sm')]: {
      overflowX: 'auto',
    },
  },
  listItem: {
    flex: '0 0 auto',
    margin: theme.spacing.unit,
    marginRight: 0,
  },
  listWrapper: {
    position: 'relative',
  },
}));

export const withArrowStyle = withStyles(theme => ({
  root: {
    position: 'absolute',
    top: theme.spacing.unit * 5,
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  left: {
    left: theme.spacing.unit * 2,
  },
  right: {
    right: theme.spacing.unit * 2,
  }
}));

