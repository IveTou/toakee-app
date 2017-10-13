import gql from 'graphql-tag';

export const query = gql`
  query EventList(
    $start: Date,
    $end: Date,
    $skip: Int,
    $categoryIds: [String],
    $limit: Int,
    $strict: Boolean,
    $status: EventStatus,
    $skipList: Boolean,
    $skipCount: Boolean!
  ) {
    viewer {
      id

      eventCount(
        start: $start,
        end: $end,
        categoryIds: $categoryIds,
        status: $status
      ) @skip(if: $skipCount)

      events(
        start: $start,
        end: $end,
        categoryIds: $categoryIds,
        skip: $skip,
        limit: $limit,
        strict: $strict,
        status: $status,
        forceEmpty: $skipList,
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
