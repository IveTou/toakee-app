import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Snackbar as MaterialSnackbar } from 'material-ui-next';

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
