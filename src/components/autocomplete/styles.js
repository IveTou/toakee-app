import { withStyles } from 'material-ui';

export const injectStyles = withStyles(theme => ({
  root: {
    position: 'relative',
  },
  suggestions: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  suggestion: { padding: theme.spacing.unit * 2 },
}));
