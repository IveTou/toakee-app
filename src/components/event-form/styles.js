import { withStyles } from 'material-ui';

export const withIndexStyle = withStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: theme.spacing.unit * 80,
    margin: 'auto',
    marginTop: theme.spacing.unit * 2,
  },
  submit: {
    textAlign: 'right',
    paddingRight: theme.spacing.unit * 2,
  }
}));

export const withMainStyle = withStyles(theme => {
  const previewImg = {
    margin: 'auto',
    height: theme.spacing.unit * 18,
    width: theme.spacing.unit * 32,
    objectFit: 'cover',
  };

  return {
    root: {
      position: 'relative',
    },
    preview: {
      textAlign: 'center',
      '& + $dropzone': {
        position: 'absolute',
        top: 0,
        left: '50%',
        opacity: 0,
        transform: 'translateX(-50%)',
      },
    },
    previewImg,
    formField: {
      marginTop: theme.spacing.unit * 2,
    },
    dropzone: {
      ...previewImg,
      color: theme.palette.text.secondary,
      position: 'relative',
      textAlign: 'center',
      border: '2px dashed',
      padding: theme.spacing.unit * 3,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    dropzoneIcon: {
      opacity: 0.54,
      fontSize: theme.typography.display3.fontSize,
    },
    dropzoneError: {
      color: theme.palette.error.light,
      '& $dropzoneIcon': {
        color: theme.palette.error.light,
      },
    },
    dates: {
      display: 'flex',
      '& > div': {
        width: '50%',
      },
    },
  };
});

export const withSectionStyle = withStyles(theme => ({
  rootExpanded: {
    '& $collapse': {
      overflow: 'visible',
    }
  },
  summaryExpanded: {
    backgroundColor: theme.palette.grey[100],
  },
  collapse: {},
  details: {
    display: 'block',
    paddingTop: theme.spacing.unit * 2,
    [theme.breakpoints.down('xs')]: {
      padding: [
        theme.spacing.unit * 2,
        theme.spacing.unit,
        theme.spacing.unit * 3,
        '',
      ].join('px '),
    },
  },
}));

export const withDatesStyle = withStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing.unit * 2,
    '& > div': {
      width: '50%',
    },
  },
}));

export const withPricesStyle = withStyles(theme => ({
  price: {
    display: 'flex',
    padding: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 2,
  },
  addButton: {
    marginLeft: theme.spacing.unit,
  },
}));
