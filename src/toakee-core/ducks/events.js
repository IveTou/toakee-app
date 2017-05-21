import { Map } from 'immutable';

import GraphQLAPI from '../apis/graphql';
import { fetchableState } from '../utils';

const START_FETCHING = 'events/START_FETCHING';
const FINISHED_FETCHING = 'events/FINISHED_FETCHING';
const SELECT_FOR_EDITING = 'events/SELECT_FOR_EDITING';

const extraArgs = ', $skip: Int, $limit: Int, $onlyMine: Boolean';
const extraQueryArgs = ', skip: $skip, limit: $limit, onlyMine: $onlyMine';
const extraProps = `
  description,
  price,
  place { name, coordinates, address, city { name } },
  directions,
`;
const memberProps = `
  members {
    profileId,
    roles
  }
`;

const eventsQuery = (full, onlyMine) => (`
  query Events($slug: String, $start: Date, $end: Date${full ? '' : extraArgs}) {
    viewer {
      events(slug: $slug, start: $start, end: $end${full ? '' : extraQueryArgs}) {
        id,
        slug,
        title,
        flyer,
        start,
        end,
        ${full ? extraProps : ''}
        ${onlyMine ? memberProps : ''}
      }
    }
  }
`);

const mapify = events => (
  events
    .map(e => ({
      ...e,
      start: e.start && new Date(e.start),
      end: e.end && new Date(e.end),
    }))
    .reduce((obj, event) => obj.set(event.id, event), Map({}))
);

const initialState = {
  selectedForEditing: null,
};

export default function reducer(state = fetchableState(initialState), action) {
  switch (action.type) {
    case START_FETCHING:
      return state.set('fetching', true);

    case FINISHED_FETCHING:
      return state
        .set('fetching', false)
        .set('fetched', true)
        .mergeIn(['data'], mapify(action.events));

    case SELECT_FOR_EDITING:
      return state
        .set('selectedForEditing', action.eventId);

    default:
      return state;
  }
}

export const selectEventForEditing = eventId => ({ type: SELECT_FOR_EDITING, eventId });
export const startFetchingEvents = () => ({ type: START_FETCHING });
export const finishedFetchingEvents = events => ({ type: FINISHED_FETCHING, events });
export const fetchEvents = ({
  start,
  end,
  slug,
  skip,
  limit,
  onlyMine,
  full,
}) => (dispatch) => {
  dispatch(startFetchingEvents());
  GraphQLAPI
    .post(eventsQuery(full, onlyMine), { start, end, slug, skip, limit, onlyMine })
    .then(({ viewer }) => dispatch(finishedFetchingEvents(viewer.events)));
};
