import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Paper } from 'material-ui';

import { withStageMenuStyle } from './styles';

const StageMenu = ({ event, classes }) => {
  return(
    <Paper elevation={4} className={classes.root}>asdasd</Paper>
  );
}

StageMenu.propTypes = {
  event: PropTypes.object,
  classes: PropTypes.object,
};

export default withStageMenuStyle(StageMenu);
