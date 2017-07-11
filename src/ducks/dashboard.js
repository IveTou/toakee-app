import { Map } from 'immutable';

export const OPEN = 'dashboard/OPEN';
export const CLOSE = 'dashboard/CLOSE';
export const TOGGLE = 'dashboard/TOGGLE';

const initialState = () => Map({ open: true });

export default function reducer(state = initialState(), action) {
  switch (action.type) {
    case OPEN:
      return state.set('open', true);

    case CLOSE:
      return state.set('open', false);

    case TOGGLE:
      return state.set('open', !state.get('open'));

    default:
      return state;
  }
}

export const openDashboard = () => ({ type: OPEN });
export const closeDashboard = () => ({ type: CLOSE });
export const toggleDashboard = () => ({ type: TOGGLE });
