import gql from 'graphql-tag';

export default gql`
  query PendingGuests {
    viewer {
      id
      firstName

      pendingGuests {
        id
        name

        event {
          title
        }
      }
    }
  }
`;

export const confirmRSVP = gql`
  mutation ConfirmRSVP($ids: [String]) {
    confirmRSVP(ids: $ids)
  }
`;
