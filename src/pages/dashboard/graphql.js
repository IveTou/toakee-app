import gql from 'graphql-tag';

export default gql`
  query Dashboard($start: Date) {
    viewer {
      id

      events(start: $start, onlyMine: true) {
        id
      }
    }
  }
`;
