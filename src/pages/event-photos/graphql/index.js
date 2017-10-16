import gql from 'graphql-tag';

export default gql`
  query EventPage($id: String) {
    viewer {
      id

      event(id: $id) {
        id
        title
        photos
      }
    }
  }
`;
