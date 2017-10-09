import gql from 'graphql-tag';

export default gql`
  query EventPage($slug: String) {
    event(slug: $slug) {
      id
      slug
      title
      flyer
      start
      end
      description
      price
      prices { description, value }
      directions
      place { id, name, coordinates, address, city { name } }
      status
      photos
    }
  }
`;

export const setEventStatusMutation = gql`
  mutation SetEventStatus($eventId: String!, $status: EventStatus) {
    updateEvent(eventId: $eventId, patch: { status: $status })
  }
`;

