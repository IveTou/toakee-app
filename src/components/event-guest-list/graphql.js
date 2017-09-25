import gql from 'graphql-tag';

const query = gql`
  query EventGuestList($eventSlug: String) {
    viewer {
      id

      event(slug: $eventSlug) {
        id
        title
        slug

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
