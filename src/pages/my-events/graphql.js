import gql from 'graphql-tag';

export default gql`
  query MyEvents($start: Date, $skip: Int, $strict: Boolean) {
    viewer {
      id

      events(start: $start, skip: $skip, strict: $strict, onlyMine: true) {
        id,
        title,
        flyer,
        start
      }
    }
  }
`;
