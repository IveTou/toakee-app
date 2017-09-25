import gql from 'graphql-tag';

export const query = gql`
  query EventList(
    $start: Date,
    $end: Date,
    $skip: Int,
    $categoryIds: [String],
    $limit: Int,
    $strict: Boolean,
  ) {
    viewer {
      id

      eventCount(start: $start, end: $end, categoryIds: $categoryIds)

      events(
        start: $start,
        end: $end,
        categoryIds: $categoryIds,
        skip: $skip,
        limit: $limit,
        strict: $strict,
      ) {
        id
        slug
        title
        flyer
        start
        end

        place { id, name, address }
      }
    }
  }
`;
