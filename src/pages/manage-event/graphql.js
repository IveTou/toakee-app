import gql from 'graphql-tag';

export default gql`
  query ManageEvent($id: String) {
    event(id: $id) {
      id
      title
      flyer
      start
    }
  }
`;
