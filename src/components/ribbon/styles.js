import { withStyles } from 'material-ui';

export const withIndexStyle = withStyles(theme => ({
  root: {
    position: 'relative',
    top: theme.spacing.unit * 2,
    color: theme.palette.common.white,
    padding: [
      theme.spacing.unit / 2,
      theme.spacing.unit,
      ''
    ].join('px '),
    font: theme.typography.title,
  },
  mini: {
    position: 'absolute',
    font: theme.typography.caption,
  },
  caption: {
    fontWeight: theme.typography.fontWeightLarge,
  },
}));

