import { createMuiTheme } from 'material-ui';
import { deepOrange, grey, blue } from 'material-ui/colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: deepOrange[300],
      main: deepOrange[500],
      dark: deepOrange[700],
      contrastText: grey[50],
    },
  },
  overrides: {
    MuiInput: {
      inkbar: {
        '&:after': {
          backgroundColor: blue[500],
        },
      },
    },
    MuiFormLabel: {
      focused: {
        color: blue[500],
      }
    }
  },
});

