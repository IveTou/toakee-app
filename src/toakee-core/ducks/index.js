import { merge } from 'lodash';
import { combineReducers } from 'redux';
import { provideState } from 'freactal';

import viewer from './viewer';
import events from './events';
import invitations from './invitations';
import dialog from './dialog';
import guestLists, { store as guestListsStore } from './guest-lists';

export default combineReducers({ viewer, events, invitations, dialog, guestLists });

const combineStores = (stores) => {
  const initialStates = merge(...stores.map(s => s.initialState));
  const effects = merge(...stores.map(s => s.effects));

  return {
    initialState: () => initialStates,
    effects,
  };
};

export const storeWrapper = provideState(combineStores([
  guestListsStore,
]));
