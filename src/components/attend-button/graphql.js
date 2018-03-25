import gql from 'graphql-tag';

export default gql`
  query Attendance($eventId: String) {
    attendance(eventId: $eventId) {
      id
    }
    discountLists(eventId: $eventId) {
      id
      name
    }
  }
`;

export const registerAttendance = gql`
  mutation RegisterAttendance($eventId: String!, $discountListId: String) {
    registerAttendance(eventId: $eventId, discountListId: $discountListId) {
      id
    }
  }
`;

export const unregisterAttendance = gql`
  mutation RegisterAttendance($eventId: String!) {
    unregisterAttendance(eventId: $eventId)
  }
`;
