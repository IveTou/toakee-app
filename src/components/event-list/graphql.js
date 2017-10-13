import gql from 'graphql-tag';

export const query = gql`
  query EventList(
    $start: Date,
    $end: Date,
    $skip: Int,
    $categoryIds: [String],
    $limit: Int,
    $strict: Boolean,
    $status: EventStatus
  ) {
    viewer {
      id

      eventCount(start: $start, end: $end, categoryIds: $categoryIds, status: $status)

      events(
        start: $start,
        end: $end,
        categoryIds: $categoryIds,
        skip: $skip,
        limit: $limit,
        strict: $strict,
        status: $status,
      ) {
        id
        slug
        title
        flyer
        start
        end
        status

        place { id, name, address }
      }
    }
  }
`;
