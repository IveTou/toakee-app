import { withStyles } from 'material-ui';

export const withIndexStyle = withStyles(theme => ({
  wrapper: {
    maxWidth: theme.spacing.unit * 100,
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.primary.light,
      width: '80%',
      height: theme.spacing.unit * 50,
    },
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.secondary.main,
      width: '100%',
      height: theme.spacing.unit * 30,
    },
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    whiteSpace: 'nowrap',
    position: 'relative',
    margin: '0 auto',
    display: 'table',
  },
  overlay: {
    height: '100%',
    width: theme.spacing.unit * 34,
    position: 'relative',
    backgroundColor: theme.palette.action.disabled,
    color: theme.palette.grey[50],
    padding: theme.spacing.unit * 2,
    display: 'inline-block',
    float: 'right',
  },
  title: {
    overflow: 'hidden',
    whiteSpace: 'normal',
    maxHeight: theme.spacing.unit * 20,
  },
  description: {
    overflow: 'hidden',
    whiteSpace: 'normal',
    maxHeight: theme.spacing.unit * 20,
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.headline.fontSize,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.title.fontSize,
    },
  },
  calendar: {
    float: 'left',
    marginRight: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    borderRight: '2px solid rgba(255, 255, 255,.26)',
  },
  timePlace: {
    paddingTop: theme.spacing.unit,
  },
  icon: {
    float: 'left',
    marginRight: theme.spacing.unit / 2,
  },
}));
