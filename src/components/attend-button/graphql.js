import gql from 'graphql-tag';

export default gql`
  query Attendance($eventId: String) {
    attendance(eventId: $eventId) {
      id
    }
  }
`;

export const registerAttendance = gql`
  mutation RegisterAttendance($eventId: String!) {
    registerAttendance(eventId: $eventId) {
      id
    }
  }
`;

export const unregisterAttendance = gql`
  mutation RegisterAttendance($eventId: String!) {
    unregisterAttendance(eventId: $eventId)
  }
`;
