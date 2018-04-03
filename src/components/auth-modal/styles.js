import { withStyles } from 'material-ui';

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
    width: theme.spacing.unit * 45,
    animation: 'slideDown .3s',
  },
  header: {
    textAlign: 'center',
    padding: theme.spacing.unit * 3,
    margin: theme.spacing.unit,
    marginBottom: 0,
    backgroundColor: theme.palette.grey[100],
  },
  headerTitle: {
    paddingTop: theme.spacing.unit * 3,
    color: theme.palette.text.secondary,
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
