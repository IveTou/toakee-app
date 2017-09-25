import gql from 'graphql-tag';

export default gql`
  query EventPage($slug: String) {
    viewer {
      id

      event(slug: $slug) {
        id
        slug
        title
        photos
      }
    }
  }
`;
