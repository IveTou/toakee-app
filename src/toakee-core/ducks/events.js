import GraphQLAPI from '../apis/graphql';
import { fetchableState } from '../utils';

const START_FETCHING = 'events/START_FETCHING';
const FINISHED_FETCHING = 'events/FINISHED_FETCHING';

const eventsQuery = `
  query Events($slug: String, $start: Date, $end: Date) {
    viewer {
      events(slug: $slug, start: $start, end: $end) {
        id,
        slug,
        title,
        description,
        price,
        flyer,
        place { name, coordinates, address, city { name } },
        directions,
        start,
        end,
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
          action.events.reduce((obj, e) => obj.set(e.id, e), state.get('data')),
        );

    default:
      return state;
  }
}


export const startFetchingEvents = () => ({ type: START_FETCHING });
export const finishedFetchingEvents = events => ({ type: FINISHED_FETCHING, events });
export const fetchEvents = ({ start, end, slug }) => (dispatch) => {
  dispatch(startFetchingEvents());
  GraphQLAPI
    .post(eventsQuery, { start, end, slug })
    .then(({ viewer }) => dispatch(finishedFetchingEvents(viewer.events)));
};
