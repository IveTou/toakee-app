import { Map } from 'immutable';

export const CHANGE = 'search/CHANGE';

const initialState = () => Map({
  query: '',
  props: {},
});

export default function reducer(state = initialState(), action) {
  switch (action.type) {
    case CHANGE:
      return state
        .set('query', action.query);

    default:
      return state;
  }
}

export const changeMainSearch = query => ({
  type: CHANGE,
  query,
});
