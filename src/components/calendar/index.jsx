import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'material-ui';

const Calendar = ({ className, date, monthVariant = 'caption', dayVariant = 'title' }) => (
  <div className={className}>
    <Typography style={{ textTransform: 'uppercase' }} variant={monthVariant} color="inherit">
      {date ? date.format('MMM') : 'Jan'}
    </Typography>
    <Typography variant={dayVariant} color="inherit">
      {date ? date.format('DD') : '01'}
    </Typography>
  </div>
);

Calendar.propTypes = {
  className: PropTypes.string,
  date: PropTypes.object,
  monthVariant: PropTypes.string,
  dayVariant: PropTypes.string,
};

export default Calendar;
