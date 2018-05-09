import gql from 'graphql-tag';

export default gql`
  query PlacePage($id: String) {
    place(id: $id) {
      id
      name
      coordinates
      address
    }
  }
`;
