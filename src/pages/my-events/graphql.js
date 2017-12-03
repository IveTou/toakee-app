import gql from 'graphql-tag';

export default gql`
  query MyEvents($start: Date) {
    viewer {
      id

      events(start: $start, onlyMine: true) {
        id,
        title,
        flyer,
      }
    }
  }
`;
