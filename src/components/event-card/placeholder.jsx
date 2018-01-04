import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Card, CircularProgress } from 'material-ui';
import { deepOrange500 } from 'material-ui/styles/colors';

const EventCardPlaceholder = ({ related }) => {
  const classes = classNames('EventCardPlaceholder', { 'EventCardPlaceholder--related': related });

  return (
    <div className={classes}>
      <Card>
        <CircularProgress
          className="EventCardPlaceholder-progress"
          size={60}
          color={deepOrange500}
        />
        <div>Carregando</div>
      </Card>
    </div>
  );
};

EventCardPlaceholder.propTypes = {
  related: PropTypes.bool,
};

export default EventCardPlaceholder;
