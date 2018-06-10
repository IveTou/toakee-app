import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button, Grid, Icon, Paper, Typography } from 'material-ui';

import Calendar from '~/src/components/calendar';

import { withStageMenuStyle } from './styles';

const StageMenu = ({ event, classes }) => {
  const { title, start, flyer } = event;
  const startMoment = moment(start);

  return(
    <Paper elevation={4} className={classes.root}>
      <Grid container spacing={0} style={{ height: '100%' }}>
        <Grid className={classes.flyer} item xs={4}>
          <div
            className={classes.flyerImage}
            alt={`flyer do ${title}`}
            style={{ backgroundImage: `url("${flyer}")` }}
          />
        </Grid>
        <Grid className={classes.menu} item xs={8}>
          <Calendar className={classes.calendar} date={startMoment} />
          <Typography className={classes.title} variant="display1" component="h1">
            {title}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

StageMenu.propTypes = {
  event: PropTypes.object,
  classes: PropTypes.object,
};

export default withStageMenuStyle(StageMenu);
