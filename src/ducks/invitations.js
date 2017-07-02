import { Map } from 'immutable';
import { deburr } from 'lodash';

const CHANGE_FILTER = 'invitations/CHANGE_FILTER';

const initialState = () => Map({
  filter: '',
});

export default function reducer(state = initialState(), action) {
  switch (action.type) {
    case CHANGE_FILTER:
      return state
        .set('filter', deburr(action.filter));

    default:
      return state;
  }
}

export const changeInvitationsFilter = filter => ({ type: CHANGE_FILTER, filter });
