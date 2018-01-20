import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Card, CircularProgress } from 'material-ui';
import { deepOrange500 } from 'material-ui/styles/colors';

const EventCardPlaceholder = ({ vertical }) => {
  const classes = classNames('EventCardPlaceholder', { 'EventCardPlaceholder--vertical': vertical });

  return (
    <div className={classes}>
      <Card className="EventCardPlaceholder-card">
        <CircularProgress
          className="EventCardPlaceholder-card-progress"
          size={60}
          color={deepOrange500}
        />
        <div>Carregando</div>
      </Card>
    </div>
  );
};

EventCardPlaceholder.propTypes = {
  vertical: PropTypes.bool,
};

export default EventCardPlaceholder;
