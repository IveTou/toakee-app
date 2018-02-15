import gql from 'graphql-tag';

export default gql`
  query EditEvent($id: String) {
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
      creator { id }
    }
  }
`;

export const updateEventMutation = gql`
  mutation UpdateEvent($eventId: String!, $patch: EventPatchInputType!) {
    updateEvent(eventId: $eventId, patch: $patch ) {
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

