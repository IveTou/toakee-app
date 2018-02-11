import { createMuiTheme } from 'material-ui-next/styles';
import {
  deepOrange,
  pink,
  red,
  grey,
  blue,
} from 'material-ui-next/colors';

import { deepOrange700, deepOrange500, blue500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const oldTheme = getMuiTheme({
  palette: {
    primary1Color: deepOrange500,
    primary2Color: deepOrange700,
    accent1Color: blue500,
    pickerHeaderColor: blue500,
  },
});

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: deepOrange[300],
      main: deepOrange[500],
      dark: deepOrange[700],
      contrastText: grey[50],
    },
    secondary: pink,
    error: red,
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

