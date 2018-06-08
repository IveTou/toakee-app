import { withStyles } from 'material-ui';

const maxStageMenuWidth = 150;
const minStageMenuHeight= 20;

export const withIndexStyle = withStyles(theme => ({
  root: {
    display: 'table',
    textAlign: 'center',
    margin: `${theme.spacing.unit * 10}px auto`,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    [theme.breakpoints.up('sm')]: {
      minHeight: '40vh',
    },
  },
  rootStage: {
    margin: `${theme.spacing.unit * 4}px auto`,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: '40vh',
    },
  },
  stageMenu: {
    margin: `${theme.spacing.unit * 2}px auto`,
    display: 'table',
    maxWidth: theme.spacing.unit * maxStageMenuWidth,
    minHeight: theme.spacing.unit * minStageMenuHeight,
  },
  publishButton: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
  },
  caption: {
    color: theme.typography.display4.color,
  }
}));

export const withStageMenuStyle = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
  }
}));
