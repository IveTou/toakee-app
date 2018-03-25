import { Map } from 'immutable';

export const OPEN = 'authModal/OPEN';
export const CLOSE = 'authModal/CLOSE';
export const GO_TO_SIGN_UP = 'authModal/GO_TO_SIGN_UP';
export const GO_TO_LOGIN = 'authModal/GO_TO_LOGIN';

const initialState = () => Map({
  open: false,
  mode: 'login',
  onSuccess: () => {},
});

export default function reducer(state = initialState(), action) {
  switch (action.type) {
    case OPEN:
      return state
        .set('open', true)
        .set('mode', action.mode)
        .set('onSuccess', action.onSuccess);

    case CLOSE:
      return state
        .set('open', false)
        .set('onSuccess', () => {});

    case GO_TO_LOGIN:
      return state.set('mode', 'login');

    case GO_TO_SIGN_UP:
      return state.set('mode', 'signUp');

    default:
      return state;
  }
}

export const goToLogin = () => ({ type: GO_TO_LOGIN });
export const goToSignUp = () => ({ type: GO_TO_SIGN_UP });
export const closeAuthModal = () => ({ type: CLOSE });
export const openAuthModal = (onSuccess, mode = 'login') => ({
  type: OPEN,
  onSuccess,
  mode,
});

