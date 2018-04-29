import { withStyles } from 'material-ui';

export const withIndexStyle = withStyles(theme => ({
  title: {
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 2,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing.unit * 2,
    }
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
  listVertical: {
    flexDirection: 'column',
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

