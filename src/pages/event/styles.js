import { withStyles } from 'material-ui';

export const withIndexStyle = withStyles(theme => ({
  root: {
    margin: '0 auto',
    maxWidth: theme.spacing.unit * 100,
  },
  media: {
    height: theme.spacing.unit * 40,
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

