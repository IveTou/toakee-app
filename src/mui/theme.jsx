import { createMuiTheme } from 'material-ui';
import { deepOrange, blue, white } from 'material-ui/colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: deepOrange[300],
      main: deepOrange[500],
      dark: deepOrange[700],
      contrastText: white,
    },
    secondary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
      contrastText: white,
    }
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

