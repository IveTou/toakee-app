import { buildMutationQuery } from '../utils';

export const setAttendanceStatusMutation = buildMutationQuery(
  'setAttendanceStatus',
  { eventId: 'String!', invitationId: 'String!', status: 'GuestStatus!' },
);
