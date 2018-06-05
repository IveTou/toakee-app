import gql from 'graphql-tag';

export default gql`
  query Dashboard($id: String) {
    profile(id: $id) {
      id
    }
  }
`;
