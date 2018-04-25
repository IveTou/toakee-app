import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography } from 'material-ui';

import { withRibbonStyle } from './styles';

const EventCardRibbon = ({ classes, children, color }) => (
  <Paper className={classes.root} elevation={4} style={{ backgroundColor: `${color}` }}>
    <Typography className={classes.caption} variant="caption" color="inherit">
      {children}
    </Typography>
  </Paper>
);

EventCardRibbon.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
  color: PropTypes.string,
};

export default withRibbonStyle(EventCardRibbon);
