import gql from 'graphql-tag';

export default gql`
  query Viewer {
    viewer { id, firstName, photo, isPromoter, isAdmin }
  }
`;
