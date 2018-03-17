import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography } from 'material-ui';

import { withRibbonStyle } from './styles';

const EventCardRibbon = ({ classes, children }) => (
  <Paper className={classes.root} elevation={4}>
    <Typography className={classes.caption} variant="caption" color="inherit">
      {children}
    </Typography>
  </Paper>
);

EventCardRibbon.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
};

export default withRibbonStyle(EventCardRibbon);
