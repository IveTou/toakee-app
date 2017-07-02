import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';
import classNames from 'classnames';

if (process.env.BROWSER) {
  require('./style.scss');
}

const buildClasses = visible => classNames('Snackbar', {
  'Snackbar--visible': visible,
});

const Snackbar = ({ visible, props: { color, message } }) => (
  <Message color={color} className={buildClasses(visible)}>
    {message}
  </Message>
);

Snackbar.propTypes = {
  visible: PropTypes.bool,
  props: PropTypes.shape({
    color: PropTypes.string,
    message: PropTypes.string,
  }),
};

export default connect(
  ({ snackbar }) => ({ visible: snackbar.get('visible'), props: snackbar.get('props') }),
)(Snackbar);
