import gql from 'graphql-tag';

export const searchCategory = gql`
  query SearchCategory($query: String!) {
    categories(query: $query) {
     id
      title
    }
  }
`;
