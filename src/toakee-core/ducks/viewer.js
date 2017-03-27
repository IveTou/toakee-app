import { Map } from 'immutable';

import GraphQLAPI from '../apis/graphql';
import { fetchableState } from '../utils';
import { LOGOUT } from './auth';

const START_FETCHING = 'viewer/START_FETCHING';
const FINISHED_FETCHING = 'viewer/FINISHED_FETCHING';

export default function reducer(state = fetchableState(), action) {
  switch (action.type) {
    case START_FETCHING:
      return state.set('fetching', true);

    case FINISHED_FETCHING:
      return state
        .set('fetching', false)
        .set('fetched', true)
        .set('data', Map({ ...action.viewer }));

    case LOGOUT:
      return fetchableState;

    default:
      return state;
  }
}

export const startFetchingViewer = () => ({ type: START_FETCHING });
export const finishedFetchingViewer = viewer => ({ type: FINISHED_FETCHING, viewer });
export const fetchViewer = () => (dispatch) => {
  dispatch(startFetchingViewer());
  GraphQLAPI
    .post('query { viewer { firstName, photo } }')
    .then(({ viewer }) => dispatch(finishedFetchingViewer(viewer)));
};
