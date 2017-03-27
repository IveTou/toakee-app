import { combineReducers } from 'redux';

import viewer from './viewer';
import events from './events';
import invitations from './invitations';
import guestLists from './guest-lists';

export default combineReducers({ viewer, events, invitations, guestLists });
