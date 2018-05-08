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
    height: theme.spacing.unit * 25,
    display: 'flex',
    backgroundColor: theme.palette.grey[100],
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing.unit * 20,
    },
  },
  avatar: {
    height: theme.spacing.unit * 15,
    width: theme.spacing.unit * 15,
    minWidth: theme.spacing.unit * 15,
    position: 'relative',
    top: theme.spacing.unit * 3,
    left: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit,
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 4,
    alignSelf: 'center',
    color: theme.palette.common.white,
    textShadow: `0px 0px 3px ${theme.palette.common.black}`,
  },
  eventsCard: {
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing.unit * 4,
    },
  },
  chip: {
    color: theme.palette.grey[50],
    backgroundColor: theme.palette.grey[500],
    margin: theme.spacing.unit,
  },
  listItem: {
    paddingBottom: 0,
    paddingLeft: theme.spacing.unit * 2,
  },
  listItemIcon: {
    marginRight: 0,
  },
  listItemText: {
    color: theme.typography.display1.color,
    fontSize: theme.typography.subheading.fontSize,
  },
  listButton: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  mapGrid: {
    minWidth: theme.spacing.unit * 17,
    margin: theme.spacing.unit,
  },
}));
