import gql from 'graphql-tag';

export default gql`
  query TopBar {
    viewer { id, firstName, photo, isPromoter }
  }
`;

export const searchQuery = gql`
  query SearchQuery($term: String) {
    search(term: $term) {
      title,
      flyer
    }
  }
`;
