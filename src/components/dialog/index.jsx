import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';

import { dialogClose } from '~/src/ducks/dialog';

const defaultCancelTrigger = {
  key: 'cancel',
  content: 'Cancelar',
  inverted: true,
};

const defaultConfirmTrigger = {
  key: 'confirm',
  color: 'green',
  content: 'Sim',
};

const defaultNeutralTrigger = {
  key: 'confirm',
  color: 'blue',
  content: 'Entendi',
};

const buildConfirmTriggers = (onClick, close, confirmTrigger, cancelTrigger) => ([
  { onClick: close, ...defaultCancelTrigger, ...cancelTrigger },
  { onClick, ...defaultConfirmTrigger, ...confirmTrigger },
]);

const buildAlertTriggers = (onClick, neutralTrigger) => ([
  { onClick, ...defaultNeutralTrigger, ...neutralTrigger },
]);

const Dialog = ({ open, close, mode, allProps }) => {
  const {
    confirmTrigger = {},
    cancelTrigger = {},
    onConfirm = () => {},
    ...modalProps
  } = allProps;

  const onClick = () => { onConfirm(); close(); };

  const actions = mode === 'confirm'
    ? buildConfirmTriggers(onClick, close, confirmTrigger, cancelTrigger)
    : buildAlertTriggers(close, confirmTrigger);

  return <Modal open={open} actions={actions} size="small" basic {...modalProps} />;
};

Dialog.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  mode: PropTypes.string,
  allProps: PropTypes.shape({
    confirmTrigger: PropTypes.obj,
    cancelTrigger: PropTypes.obj,
    onConfirm: PropTypes.func,
  }),
};

export default connect(
  ({ dialog }) => ({
    open: dialog.get('open'),
    mode: dialog.get('mode'),
    allProps: dialog.get('props'),
  }),
  dispatch => ({
    close: () => dispatch(dialogClose()),
  }),
)(Dialog);
