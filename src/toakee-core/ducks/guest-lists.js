import GraphQLAPI from '../apis/graphql';
import { fetchableState } from '../utils';

const START_FETCHING = 'guestLists/START_FETCHING';
const FINISHED_FETCHING = 'guestLists/FINISHED_FETCHING';

const guestListsQuery = `
  query GuestLists($eventId: String, $eventSlug: String) {
    viewer {
      guestLists(eventId: $eventId, eventSlug: $eventSlug) {
        id,
        name,
        limit,
        registrationDeadline,
        entranceDeadline,
        badge { acronym, color },
      }
    }
  }
`;

export default function reducer(state = fetchableState(), action) {
  switch (action.type) {
    case START_FETCHING:
      return state.set('fetching', true);

    case FINISHED_FETCHING:
      return state
        .set('fetching', false)
        .set('fetched', true)
        .set(
          'data',
          action.guestLists.reduce((obj, e) => obj.set(e.id, e), state.get('data')),
        );

    default:
      return state;
  }
}

export const startFetchingGuestLists = () => ({ type: START_FETCHING });
export const finishedFetchingGuestLists =
  (eventSlug, guestLists) => ({ type: FINISHED_FETCHING, eventSlug, guestLists });

export const fetchGuestLists = ({ eventId, eventSlug }) => (dispatch) => {
  dispatch(startFetchingGuestLists());
  GraphQLAPI
    .post(guestListsQuery, { eventId, eventSlug })
    .then(({ viewer }) => (
      dispatch(finishedFetchingGuestLists(eventSlug, viewer.guestLists))
    ));
};
