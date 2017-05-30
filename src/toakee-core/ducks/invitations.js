import { Map } from 'immutable';
import { deburr } from 'lodash';

import GraphQLAPI from '../apis/graphql';
import { fetchableState, buildMutationQuery } from '../utils';

const CHANGE_FILTER = 'invitations/CHANGE_FILTER';
const START_FETCHING = 'invitations/START_FETCHING';
const FINISHED_FETCHING = 'invitations/FINISHED_FETCHING';
const SET_ATTENDANCE_STATUS = 'invitations/SET_ATTENDANCE_STATUS';
const ADDED_NAMES_TO_GUEST_LIST = 'invitations/CREATED';
const REMOVED_INVITATION = 'invitations/REMOVED';

const invitationsQuery = `
  query Invitations($eventId: String, $eventSlug: String) {
    viewer {
      invitations(eventId: $eventId, eventSlug: $eventSlug) {
        id,
        name,
        eventId,
        guestListId,
        profileId,
        status,
        timestamp,
      }
    }
  }
`;

const setAttendanceStatusMutation = buildMutationQuery(
  'setAttendanceStatus',
  { invitationId: 'String!', status: 'GuestStatus!' },
);

const removeInvitationMutation = buildMutationQuery(
  'removeInvitation',
  { eventId: 'String!', invitationId: 'String!' },
);

const addNamesToGuestListMutation = buildMutationQuery(
  'addNamesToGuestList',
  {
    eventId: 'String!',
    guestListId: 'String!',
    names: '[String]',
    recaptchaToken: 'String',
  },
  '{ id, name, guestListId, profileId, status, timestamp }',
);

const mapify = invitations => (
  invitations
    .map(i => ({
      ...i,
      normalizedName: deburr(i.name),
    }))
    .reduce((obj, invitation) => obj.set(invitation.id, invitation), Map({}))
);

const initialState = {
  filter: '',
  newInvitations: '',
};

export default function reducer(state = fetchableState(initialState), action) {
  switch (action.type) {
    case START_FETCHING:
      return state.set('fetching', true);

    case FINISHED_FETCHING:
      return state
        .set('fetching', false)
        .set('fetched', true)
        .mergeIn(['data'], mapify(action.invitations));

    case CHANGE_FILTER:
      return state
        .set('filter', deburr(action.filter));

    case ADDED_NAMES_TO_GUEST_LIST:
      return state
        .set('newInvitations', '')
        .mergeIn(['data'], mapify(action.invitations));

    case SET_ATTENDANCE_STATUS:
      return state
        .setIn(
          ['data', action.invitationId],
          { ...state.getIn(['data', action.invitationId]), status: action.status },
        );

    case REMOVED_INVITATION:
      return state
        .removeIn(['data', action.invitationId]);

    default:
      return state;
  }
}

export const startFetchingInvitations = () => ({ type: START_FETCHING });

export const finishedFetchingInvitations =
  (eventSlug, invitations) => ({ type: FINISHED_FETCHING, eventSlug, invitations });

export const fetchInvitations = ({ eventId, eventSlug }) => (dispatch) => {
  dispatch(startFetchingInvitations());
  GraphQLAPI
    .post(invitationsQuery, { eventId, eventSlug })
    .then(({ viewer }) => (
      dispatch(finishedFetchingInvitations(eventSlug, viewer.invitations))
    ));
};

export const changeInvitationsFilter = filter => ({ type: CHANGE_FILTER, filter });

export const setAttendanceStatus = (invitationId, status) => ({
  type: SET_ATTENDANCE_STATUS,
  invitationId,
  status,
});

export const removedInvitation =
  invitationId => ({ type: REMOVED_INVITATION, invitationId });

export const removeInvitation = (eventId, invitationId) => (dispatch) => {
  GraphQLAPI
    .post(removeInvitationMutation, { eventId, invitationId })
    .then(({ removeInvitation: ok }) => (
      ok && dispatch(removedInvitation(invitationId))
    ));
};

export const changeAttendanceStatus = (invitationId, status) => (dispatch) => {
  GraphQLAPI
    .post(setAttendanceStatusMutation, { invitationId, status })
    .then(({ errors }) => {
      if (!errors) dispatch(setAttendanceStatus(invitationId, status));
    });
};

export const namesAddedToGuestList =
  invitations => ({ type: ADDED_NAMES_TO_GUEST_LIST, invitations });

export const addNamesToGuestList = (eventId, guestListId, names, recaptchaToken) => (dispatch) => {
  GraphQLAPI
    .post(addNamesToGuestListMutation, { eventId, guestListId, names, recaptchaToken })
    .then(({ errors, addNamesToGuestList: invitations }) => {
      if (!errors) dispatch(namesAddedToGuestList(invitations));
    });
};
