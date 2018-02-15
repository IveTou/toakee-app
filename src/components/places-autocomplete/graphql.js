import gql from 'graphql-tag';

export const searchPlace = gql`
  query SearchPlace($query: String!, $limit: Int) {
    places(query: $query, limit: $limit) { id name address coordinates }
  }
`;
