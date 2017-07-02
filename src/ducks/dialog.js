import { Map } from 'immutable';

export const OPEN = 'dialog/OPEN';
export const CLOSE = 'dialog/CLOSE';

const initialState = () => Map({
  open: false,
  mode: 'alert',
  props: {},
});

export default function reducer(state = initialState(), action) {
  switch (action.type) {
    case OPEN:
      return state
        .set('mode', action.mode)
        .set('props', action.props)
        .set('open', true);

    case CLOSE:
      return state
        .set('open', false);

    default:
      return state;
  }
}

export const dialogConfirm = (title, onConfirm, props) => ({
  type: OPEN,
  mode: 'confirm',
  props: { header: title, onConfirm, ...props },
});

export const dialogAlert = (title, props = {}) => ({
  type: OPEN,
  mode: 'alert',
  props: { header: title, ...props },
});

export const dialogClose = () => ({ type: CLOSE });
