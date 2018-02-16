import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui';

import { withPlaceholderStyle } from './styles';

const EventCardPlaceholder = ({ className, classes }) => (
  <div className={className}>
    <div className={classes.card}>
      <div className={classes.cardMedia}>
        <CircularProgress size={40} />
      </div>
    </div>
  </div>
);

EventCardPlaceholder.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
};

export default withPlaceholderStyle(EventCardPlaceholder);
