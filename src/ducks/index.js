import { combineReducers } from 'redux';

import invitations from './invitations';
import dialog from './dialog';
import snackbar from './snackbar';
import dashboard from './dashboard';
import search from './search';

export default combineReducers({
  invitations,
  dialog,
  dashboard,
  search,
  snackbar,
});

