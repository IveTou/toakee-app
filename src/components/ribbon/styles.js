import { withStyles } from 'material-ui';

export const withRibbonStyle = withStyles(theme => ({
  root: {
    position: 'absolute',
    top: theme.spacing.unit * 2,
    color: theme.palette.common.white,
    padding: [
      theme.spacing.unit / 2,
      theme.spacing.unit,
      ''
    ].join('px '),
  },
  caption: {
    fontWeight: theme.typography.fontWeightLarge,
  },
}));

