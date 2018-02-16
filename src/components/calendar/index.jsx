import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'material-ui';

const Calendar = ({ className, date }) => (
  <div className={className}>
    <Typography style={{ textTransform: 'uppercase' }} variant="caption">
      {date.format('MMM')}
    </Typography>
    <Typography variant="title" color="inherit">
      {date.format('DD')}
    </Typography>
  </div>
);

Calendar.propTypes = {
  className: PropTypes.string,
  date: PropTypes.object,
};

export default Calendar;
