import gql from 'graphql-tag';

export const searchCategory = gql`
  query SearchCategory($query: String!, $limit: Int) {
    categories(query: $query, limit: $limit) {
      id
      title
    }
  }
`;
