import gql from 'graphql-tag';

export default gql`
  query EventPage($id: String) {
    event(id: $id) {
      id
      title
      flyer
      start
      end
      description
      discountLists
      price
      prices { description, value }
      categories { id, title },
      directions
      place { id, name, coordinates, address, city { name } }
      status
      photos { src, thumb }
      creator { id }
      discountLists { id },
    }
  }
`;

export const setEventStatusMutation = gql`
  mutation SetEventStatus($eventId: String!, $status: EventStatus) {
    updateEvent(eventId: $eventId, patch: { status: $status }) {
      status
    }
  }
`;

