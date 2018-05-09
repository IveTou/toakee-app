import gql from 'graphql-tag';

export default gql`
  query PlacePage($id: String) {
    place(id: $id) {
      id
      name
      coordinates
      address
      city { name }
    }
  }
`;

export const setPlaceStatusMutation = gql`
  mutation SetPlaceStatus($eventId: String!, $status: EventStatus) {
    updateEvent(eventId: $eventId, patch: { status: $status }) {
      status
    }
  }
`;
