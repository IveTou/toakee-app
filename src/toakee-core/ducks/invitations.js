import { Map } from 'immutable';

import GraphQLAPI from '../apis/graphql';
import { fetchableState, buildMutationQuery } from '../utils';

const CHANGE_FILTER = 'guestLists/CHANGE_FILTER';
const START_FETCHING = 'invitations/START_FETCHING';
const FINISHED_FETCHING = 'invitations/FINISHED_FETCHING';
const SET_ATTENDANCE_STATUS = 'invitations/SET_ATTENDANCE_STATUS';

const invitationsQuery = `
  query Invitations($eventId: String, $eventSlug: String) {
    viewer {
      invitations(eventId: $eventId, eventSlug: $eventSlug) {
        id,
        name,
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

const initialState = {
  filter: '',
};

export default function reducer(state = fetchableState(initialState), action) {
  let invitations;

  switch (action.type) {
    case START_FETCHING:
      return state.set('fetching', true);

    case FINISHED_FETCHING:
      invitations = action.invitations
        .map(i => ({
          ...i,
          normalizedName: i.name.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
        }))
        .reduce((obj, invitation) => obj.set(invitation.id, invitation), Map({}));

      return state
        .set('fetching', false)
        .set('fetched', true)
        .set('data', invitations);

    case CHANGE_FILTER:
      return state
        .set('filter', action.filter);

    case SET_ATTENDANCE_STATUS:
      return state
        .setIn(
          ['data', action.invitationId],
          { ...state.getIn(['data', action.invitationId]), status: action.status },
        );

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

export const changeAttendanceStatus = (invitationId, status) => (dispatch) => {
  GraphQLAPI
    .post(setAttendanceStatusMutation, { invitationId, status })
    .then(({ errors }) => {
      if (!errors) dispatch(setAttendanceStatus(invitationId, status));
    });
};
