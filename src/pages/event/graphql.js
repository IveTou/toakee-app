import gql from 'graphql-tag';

export default gql`
  query EventPage($slug: String) {
    viewer {
      id

      events(slug: $slug) {
        id
        slug
        title
        flyer
        start
        end
        description
        price
        prices { description, value }
        directions
        place { id, name, coordinates, address, city { name } }
        photos
      }
    }
  }
`;

