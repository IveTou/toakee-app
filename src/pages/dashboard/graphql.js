import gql from 'graphql-tag';

export default gql`
  query Dashboard($start: Date) {
    viewer {
      id
      eventCount(start: $start)
    }
  }
`;
