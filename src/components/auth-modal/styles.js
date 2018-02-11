import { withStyles } from 'material-ui-next';

const headerTweaker = 14;

export const withIndexStyle = withStyles(theme => ({
  '@keyframes slideDown': {
    from: { transform: 'translate(-50%, -75%)' },
    to: { transform: 'translate(-50%, -50%)' },
  },
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    paddingTop: theme.spacing.unit * headerTweaker,
    width: theme.spacing.unit * 45,
    animation: 'slideDown .3s',
  },
  header: {
    width: `calc(100% - ${theme.spacing.unit * 4}px)`,
    height: theme.spacing.unit * 16,
    padding: theme.spacing.unit * 2,
    position: 'absolute',
    marginTop: theme.spacing.unit * -(headerTweaker + 2),
    marginLeft: theme.spacing.unit * 2,
    backgroundColor: theme.palette.primary.main,
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  headerTitle: {
    fontWeight: theme.typography.fontWeightLight,
    color: theme.palette.primary.contrastText,
  },
  headerIcon: {
    fontSize: theme.typography.display2.fontSize,
  },
}));

export const withLoginStyle = withStyles(theme => ({
  form: {
    padding: theme.spacing.unit * 2,
  },
  formSubmitButton: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
  },
  formGoToSignUpButton: {
    marginTop: theme.spacing.unit * 2,
  },
}));

export const withSignUpStyle = withStyles(theme => ({
  form: {
    padding: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 4,
  },
  formNameField: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      width: `calc(50% - ${theme.spacing.unit}px)`,
    },
  },
  formSubmitButton: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
  },
  formGoToLoginButton: {
    marginTop: theme.spacing.unit * 2,
  },
}));
