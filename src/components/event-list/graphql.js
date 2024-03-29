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
    $has: String,
    $relatedTo: String,
    $sort: JSON,
    $skipList: Boolean,
    $skipCount: Boolean!
  ) {
    viewer {
      id

      eventCount(
        start: $start,
        end: $end,
        categoryIds: $categoryIds,
        status: $status,
        has: $has,
        relatedTo: $relatedTo,
      ) @skip(if: $skipCount)

      events(
        start: $start,
        end: $end,
        categoryIds: $categoryIds,
        skip: $skip,
        limit: $limit,
        strict: $strict,
        status: $status,
        has: $has,
        relatedTo: $relatedTo,
        sort: $sort,
        forceEmpty: $skipList,
      ) {
        id
        title
        flyer
        start
        end
        status

        place { id, name, address }
        discountLists {
          id
        }
      }
    }
  }
`;
