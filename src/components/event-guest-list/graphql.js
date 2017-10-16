import gql from 'graphql-tag';

const query = gql`
  query EventGuestList($eventId: String) {
    viewer {
      id

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
  }
`;

export const setAttendanceStatusMutation = gql`
  mutation SetAttendanceStatusMutation(
    $eventId: String!,
    $invitationId: String!,
    $status: GuestStatus!
  ) {
    setAttendanceStatusMutation(eventId: $eventId, invitationId: $invitationId, status: $status)
  }
`;

export default query;
