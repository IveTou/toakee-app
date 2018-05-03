import { withStyles } from 'material-ui';

export const withIndexStyle = withStyles(theme => ({
  root: {
    position: 'relative',
    display: 'table',
    top: theme.spacing.unit * 2,
    color: theme.palette.common.white,
    padding: [
      theme.spacing.unit,
      theme.spacing.unit * 2,
      ''
    ].join('px '),
  },
  mini: {
    position: 'absolute',
    fontSize: theme.typography.caption.fontSize,
    padding: [
      theme.spacing.unit / 2,
      theme.spacing.unit,
      ''
    ].join('px '),
  },
  caption: {
    fontSize: theme.typography.title.fontSize,
    fontWeight: theme.typography.fontWeightRegular,
  },
  captionMini: {
    fontWeight: theme.typography.fontWeightLarge,
    fontSize: theme.typography.caption.fontSize,
  },
}));

