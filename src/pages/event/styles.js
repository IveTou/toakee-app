import { withStyles } from 'material-ui';

export const withIndexStyle = withStyles(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      margin: '0 auto',
      paddingTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 10,
      maxWidth: theme.spacing.unit * 140,
    },
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
    [theme.breakpoints.up('md')]: {
      height: theme.spacing.unit * 40,
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing.unit * 30,
    },
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
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
    marginTop: theme.spacing.unit,
  },
  eventsCard: {
    paddingRight: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing.unit * 4,
    },
  },
  gridList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 2,
  },
  gridListTitle: {
    marginTop: 24,
    color: theme.typography.display1.color,
  },
  column: {
    flexBasis: '33.33%',
  },
  galleryRoot: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
  },
  galleryTitle: {
    cursor: 'pointer',
    margin: 0,
    border: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

