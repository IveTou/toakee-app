import gql from 'graphql-tag';

export const dashboardMenuQuery = gql`
  query DashboardMenu($start: Date, $skip: Int) {
    viewer {
      id

      events(start: $start, onlyMine: true, skip: $skip) {
        id,
        title,
        flyer,
      }
    }
  }
`;
