import { Map } from 'immutable';

import { extractGraphQLError } from '~/src/utils/errors';

export const SHOW = 'snackbar/SHOW';
export const DISMISS = 'snackbar/DISMISS';

const initialState = () => Map({
  visible: false,
  props: {},
});

export default function reducer(state = initialState(), action) {
  switch (action.type) {
    case SHOW:
      return state
        .set('visible', true)
        .set('props', action.props);

    case DISMISS:
      return state
        .set('visible', false)
        .set('props', {});

    default:
      return state;
  }
}

export const dismissSnackbar = () => ({ type: DISMISS });
export const showSnackbar = props => (dispatch) => {
  setTimeout(() => dispatch(dismissSnackbar()), props.delay || 4000);
  dispatch({ type: SHOW, props });
};
export const alertGraphQLError = error => dispatch => dispatch(showSnackbar({
  message: extractGraphQLError(error),
  color: 'red',
}));
