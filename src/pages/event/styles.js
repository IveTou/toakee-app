import { withStyles } from 'material-ui';

export const withIndexStyle = withStyles(theme => ({
  root: {
    paddingBottom: 0,
    [theme.breakpoints.up('md')]: {
      margin: '0 auto',
      maxWidth: theme.spacing.unit * 100,
      marginBottom: theme.spacing.unit * 10,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  media: {
    [theme.breakpoints.up('md')]: {
      height: theme.spacing.unit * 40,
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing.unit * 30,
    },
  },
  title: {
    marginTop: theme.spacing.unit,
  },
  calendar: {
    float: 'left',
    marginRight: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    borderRight: '1px solid rgba(0, 0, 0,.13)',
    color: theme.typography.display1.color,
  },
  listItem: {
    paddingBottom: 0,
  },
  listSubheader: {
    paddingTop: theme.spacing.unit * 2,
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
  },
}));

