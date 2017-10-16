import gql from 'graphql-tag';

export const query = gql`
  query Search($query: String!, $start: Date) {
    nextEvents: search(query: $query, start: $start) {
      ...EventPart
    }
    previousEvents: search(query: $query, end: $start) {
      ...EventPart
    }
  }

  fragment EventPart on Event {
    id
    title
    flyer
    start
    end

    place { id, name, address }
  }
`;
