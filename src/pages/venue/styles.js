import { withStyles } from 'material-ui';

export const withIndexStyle = withStyles(theme => ({
  root: {
    margin: '0 auto',
    paddingTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 10,
    maxWidth: theme.spacing.unit * 140,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 0,
    },
  },
  card: {
    paddingBottom: 0,
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing.unit * 2,
    },
  },
  media: {
    height: theme.spacing.unit * 30,
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing.unit * 20,
    },
  },
  avatar: {
    height: theme.spacing.unit * 15,
    width: theme.spacing.unit * 15,
    position: 'relative',
    top: theme.spacing.unit * 3,
    left: theme.spacing.unit * 3,
  },
  eventsCard: {
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing.unit * 4,
    },
  },
}));
