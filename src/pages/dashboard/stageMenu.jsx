import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Paper } from 'material-ui';

import { withIndexStyle } from './styles';

const StageMenu = ({ event }) => {
  console.log(event);
  return(
    <Paper elevation={4}>asdasd</Paper>
  );
}

StageMenu.propTypes = {
  event: PropTypes.object,
};

export default StageMenu;
