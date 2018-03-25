import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Snackbar as MaterialSnackbar } from 'material-ui';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Snackbar = ({ visible, props: { message } }) => (
  <MaterialSnackbar
    open={!!visible}
    message={message || ''}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  />
);

Snackbar.propTypes = {
  visible: PropTypes.bool,
  props: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default connect(
  ({ snackbar }) => ({
    visible: snackbar.get('visible'),
    props: snackbar.get('props'),
  }),
)(Snackbar);
