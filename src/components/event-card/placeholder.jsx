import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { CircularProgress } from 'material-ui';
import { deepOrange500 } from 'material-ui/styles/colors';

const EventCardPlaceholder = ({ vertical }) => {
  const classes = classNames('EventCardPlaceholder', { 'EventCardPlaceholder--vertical': vertical });

  return (
    <div className={classes}>
      <div className="EventCardPlaceholder-content">
        <CircularProgress
          className="EventCardPlaceholder-content-progress"
          size={60}
          color={deepOrange500}
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
