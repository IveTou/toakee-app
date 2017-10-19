
import gql from 'graphql-tag';

export default gql`
  query EventPage($id: String) {
    event(id: $id) {
      id
      title
      photos { src, thumb }
    }
  }
`;
