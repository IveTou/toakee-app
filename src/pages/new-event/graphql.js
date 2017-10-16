import gql from 'graphql-tag';

export const createEventMutation = gql`
  mutation CreateEvent(
    $title: String!,
    $description: String,
    $directions: String,
    $flyer: String,
    $price: String,
    $prices: [PriceInput],
    $start: Date,
    $end: Date,
    $place: PlaceInput,
    $categories: [CategoryInput],
    $status: EventStatus,
  ) {
    createEvent(
      title: $title,
      description: $description,
      directions: $directions,
      flyer: $flyer,
      price: $price,
      prices: $prices,
      start: $start,
      end: $end,
      place: $place,
      categories: $categories,
      status: $status,
    ) {
      id,
      status,
    }
  }
`;
