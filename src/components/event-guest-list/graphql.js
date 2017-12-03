import gql from 'graphql-tag';

const query = gql`
  query EventGuestList($eventId: String) {
    event(id: $eventId) {
      id
      title

      guestLists {
        id
        name

        invitations {
          id
          name
          normalizedName
          status
        }
      }
    }
  }
`;

export const setAttendanceStatusMutation = gql`
  mutation SetAttendanceStatus(
    $eventId: String!,
    $invitationId: String!,
    $status: GuestStatus!
  ) {
    setAttendanceStatus(eventId: $eventId, invitationId: $invitationId, status: $status)
  }
`;

export default query;
