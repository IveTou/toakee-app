import { withStyles } from 'material-ui';
import { deepOrange, green, lightBlue } from 'material-ui/colors';

const maxStageMenuWidth = 150;
const minStageMenuWidth = 89;
const menuStageHeight = 48;

export const withIndexStyle = withStyles(theme => ({
  root: {
    display: 'table',
    textAlign: 'center',
    margin: `${theme.spacing.unit * 10}px auto`,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    [theme.breakpoints.up('sm')]: {
      minHeight: '100%',
    },
  },
  rootStage: {
    margin: `${theme.spacing.unit * 4}px auto`,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: '100%',
    },
  },
  stageMenu: {
    margin: `${theme.spacing.unit * 2}px auto`,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    display: 'table',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing.unit * 12,
    },
  },
  avatar: {
    height: theme.spacing.unit * 10,
    width: theme.spacing.unit * 10,
    margin: `${theme.spacing.unit * 2}px auto`,
    color: theme.palette.common.white,
    backgroundColor: deepOrange[100],
  },
  publishButton: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
  },
  caption: {
    color: theme.typography.display4.color,
  },
  messageCentered: {
    textAlign: 'center',
  },
  icon: {
    fontSize: theme.spacing.unit * 7,
  },
}));

export const withStageMenuStyle = withStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: theme.spacing.unit * maxStageMenuWidth,
    height: theme.spacing.unit * menuStageHeight,
    [theme.breakpoints.up('md')]: {
      minWidth: theme.spacing.unit * minStageMenuWidth,
    },
  },
  flyer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
  flyerImage: {
    height: '100%',
    width: '100%',
    backgroundSize: 'cover',
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.common.white,
    backgroundPosition: 'center',
    position: 'relative',
    display: 'inline-block',
    '&:after': {
      content: 'open-quote',
      position: 'absolute',
      display: 'block',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      boxShadow: 'inset -48px 0 16px -32px',
    },
  },
  menu: {
    padding: theme.spacing.unit * 2,
    paddingLeft: 0,
    width: '100%',
  },
  title: {
    marginBottom: theme.spacing.unit * 3,
    height: theme.spacing.unit * 9,
    overflow: 'hidden',
  },
  calendar: {
    float: 'left',
    marginRight: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    borderRight: '1px solid rgba(0, 0, 0,.13)',
    color: theme.typography.display1.color,
  },
  iconCanvas: {
    position: 'absolute',
    top: theme.spacing.unit / -2,
    marginRight: theme.spacing.unit * 3,
    zIndex: theme.zIndex.mobileStepper,
  },
  icon: {
    padding: theme.spacing.unit * 2,
    fontSize: theme.spacing.unit * 4,
    color: theme.palette.common.white,
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: theme.spacing.unit,
  },
  itemInfo: {
    backgroundColor: theme.palette.grey[200],
    position: 'relative',
    width: '100%',
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 12,
    display: 'inline-flex',
    justifyContent: 'space-between',
  },
  itemInfoTitle: {
    color: theme.typography.caption.color,
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  green: {
    backgroundColor: green[500],
  },
  lightBlue: {
    backgroundColor: lightBlue[500],
  },
}));
