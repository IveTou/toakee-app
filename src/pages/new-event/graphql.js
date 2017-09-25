import gql from 'graphql-tag';

export const createEventMutation = gql`
  mutation CreateEvent(
    $title: String!,
    $description: String,
    $directions: String,
    $flyer: String,
    $prices: [PriceInput],
    $start: Date,
    $end: Date,
    $place: PlaceInput,
    $categories: [CategoryInput],
  ) {
    createEvent(
      title: $title,
      description: $description,
      directions: $directions,
      flyer: $flyer,
      prices: $prices,
      start: $start,
      end: $end,
      place: $place,
      categories: $categories,
    ) {
      slug,
    }
  }
`;