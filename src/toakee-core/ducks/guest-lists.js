import { Map } from 'immutable';
import moment from 'moment';
import { keyBy, merge } from 'lodash';

import GraphQLAPI from '../apis/graphql';
import { fetchableState, buildMutationQuery } from '../utils';

const START_FETCHING = 'guestLists/START_FETCHING';
const FINISHED_FETCHING = 'guestLists/FINISHED_FETCHING';
const STARTED_CREATING = 'guestLists/STARTED_CREATING';
const FINISHED_CREATING = 'guestLists/FINISHED_CREATING';

const guestListsQuery = `
  query GuestLists($eventId: String, $eventSlug: String) {
    viewer {
      guestLists(eventId: $eventId, eventSlug: $eventSlug) {
        id,
        eventId
        name,
        privacy,
        limit,
        registrationDeadline,
        entranceDeadline,
        socialIntegrations { mediaUrl, mediaId, network },
        badge { acronym, color },
      }
    }
  }
`;

const createGuestListMutation = buildMutationQuery(
  'createGuestList',
  {
    eventId: 'String!',
    name: 'String',
    registrationDeadline: 'Date',
    entranceDeadline: 'Date',
    socialIntegrations: '[SocialIntegrationInputType]',
  },
  '{ id }',
);

const updateGuestListMutation = buildMutationQuery(
  'updateGuestList',
  {
    eventId: 'String!',
    guestListId: 'String!',
    patch: 'GuestListPatchInputType!',
  },
);

const mapify = guestLists => (
  guestLists.reduce(
    (obj, invitation) => obj.set(invitation.id, {
      ...invitation,
      registrationDeadline: moment(invitation.registrationDeadline),
      entranceDeadline: moment(invitation.entranceDeadline),
    }),
    Map({}),
  )
);

const initialState = {
  startedCreating: false,
  finishedCreating: false,
};

export const store = {
  initialState: {
    guestLists: {},
  },
  effects: {
    fetchGuestLists: (_, { eventId, eventSlug }) =>
      GraphQLAPI
        .post(guestListsQuery, { eventId, eventSlug })
        .then(({ viewer }) => (
          state => Object.assign({}, state, keyBy(viewer.guestLists, 'id'))
        )),
    updateGuestList: (_, eventId, guestListId, patch) =>
      GraphQLAPI
        .post(updateGuestListMutation, { eventId, guestListId, patch })
        .then(ok => (
          state => (
            !ok ? state : merge({}, state, { guestLists: { [guestListId]: patch } })
          )
        )),
  },
};

export default function reducer(state = fetchableState(initialState), action) {
  switch (action.type) {
    case START_FETCHING:
      return state.set('fetching', true);

    case FINISHED_FETCHING:
      return state
        .set('fetching', false)
        .set('fetched', true)
        .mergeIn(['data'], mapify(action.guestLists));

    case STARTED_CREATING:
      return state.set('startedCreating', true);

    case FINISHED_CREATING:
      return state
        .set('startedCreating', false)
        .mergeIn(['data'], mapify([action.guestList]));

    default:
      return state;
  }
}

export const startFetching = () => ({ type: START_FETCHING });
export const finishedFetching =
  (eventSlug, guestLists) => ({ type: FINISHED_FETCHING, eventSlug, guestLists });

export const startedCreating = () => ({ type: STARTED_CREATING });
export const finishedCreating = guestList => ({ type: FINISHED_CREATING, guestList });

export const createGuestList = (eventId, guestList) => (dispatch) => {
  dispatch(startedCreating());
  GraphQLAPI
    .post(createGuestListMutation, { eventId, ...guestList })
    .then(({ createGuestList: { id } }) => (
      dispatch(finishedCreating({ id, eventId, ...guestList }))
    ));
};

export const fetchGuestLists = ({ eventId, eventSlug }) => (dispatch) => {
  dispatch(startFetching());
  GraphQLAPI
    .post(guestListsQuery, { eventId, eventSlug })
    .then(({ viewer }) => (
      dispatch(finishedFetching(eventSlug, viewer.guestLists))
    ));
};
