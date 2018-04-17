import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'material-ui';

const Calendar = ({ className, date, small }) => {
  const monthVariant =  small ? 'caption': 'title';
  const dayVariant = small ? 'title' : 'display1';

  return(
    <div className={className}>
      <If condition={date}>
        <Typography style={{ textTransform: 'uppercase' }} variant={monthVariant} color="inherit">
          {date.format('MMM')}
        </Typography>
        <Typography variant={dayVariant} color="inherit">
          {date.format('DD')}
        </Typography>
      </If>
    </div>
  );
}

Calendar.propTypes = {
  className: PropTypes.string,
  date: PropTypes.object,
  small: PropTypes.bool,
};

export default Calendar;
