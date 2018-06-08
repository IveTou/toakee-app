import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'material-ui';

const Calendar = ({ date, small, gutters }) => {
  const monthVariant =  small ? 'caption': 'title';
  const dayVariant = small ? 'title' : 'display1';

  return(
    <div style={gutters && { paddingTop: 8, paddingRight: 8 }}>
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
  date: PropTypes.object,
  small: PropTypes.bool,
  gutters: PropTypes.bool,
};

export default Calendar;
