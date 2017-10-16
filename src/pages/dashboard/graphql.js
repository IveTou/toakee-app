import gql from 'graphql-tag';

export const dashboardMenuQuery = gql`
  query DashboardMenu($start: Date) {
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
