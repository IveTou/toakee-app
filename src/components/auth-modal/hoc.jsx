import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withInfo } from '~/src/hocs';
import { userIsLogged } from '~/src/auth';
import { openAuthModal } from '~/src/ducks/auth-modal';

export const withAuth = compose(
  withInfo(['viewer']),
  connect(
    () => ({}),
    (dispatch, { viewer }) => ({
      requireLogin: fn => () => userIsLogged(viewer)
        ? fn(viewer)
        : dispatch(openAuthModal(fn)),
    }),
  ),
);
