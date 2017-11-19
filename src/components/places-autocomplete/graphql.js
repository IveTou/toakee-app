import gql from 'graphql-tag';

export const searchPlace = gql`
  query SearchPlace($query: String!) {
    places(query: $query) {
      id
      name
      address
      coordinates
    }
  }
`;
