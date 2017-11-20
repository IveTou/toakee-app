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
      price
      prices { description, value }
      categories { id, title },
      directions
      place { id, name, coordinates, address, city { name } }
      status
      photos { src, thumb }
      creator { id }
    }
  }
`;

export const setEventStatusMutation = gql`
  mutation SetEventStatus($eventId: String!, $patch: EventPatchInput!) {
    updateEvent(eventId: $eventId, patch: $patch)
  }
`;

