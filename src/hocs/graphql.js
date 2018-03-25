import { connect } from 'react-redux';
import { alertGraphQLError } from '~/src/ducks/snackbar';

export const withGraphqlError = connect(() => ({}), dispatch => ({
  onGraphqlError: error => dispatch(alertGraphQLError(error)),
}));
