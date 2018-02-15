import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CircularProgress } from 'material-ui';

const EventCardPlaceholder = ({ vertical }) => {
  const classes = classNames('EventCardPlaceholder', { 'EventCardPlaceholder--vertical': vertical });

  return (
    <div className={classes}>
      <div className="EventCardPlaceholder-content">
        <CircularProgress
          className="EventCardPlaceholder-content-progress"
          size={60}
        />
        <div>Carregando</div>
      </div>
    </div>
  );
};

EventCardPlaceholder.propTypes = {
  vertical: PropTypes.bool,
};

export default EventCardPlaceholder;
