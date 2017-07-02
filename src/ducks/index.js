import { combineReducers } from 'redux';

import invitations from './invitations';
import dialog from './dialog';
import snackbar from './snackbar';
import dashboard from './dashboard';

export default combineReducers({
  invitations,
  dialog,
  dashboard,
  snackbar,
});

