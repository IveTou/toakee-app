import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'material-ui';

const Calendar = ({ className, date, small }) => {
  const month =  small ? 'caption': 'title';
  const day = small ? 'title' : 'display1';

  return(
    <div className={className}>
      <If condition={date}>
        <Typography style={{ textTransform: 'uppercase' }} variant={month} color="inherit">
          {date.format('MMM')}
        </Typography>
        <Typography variant={day} color="inherit">
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
