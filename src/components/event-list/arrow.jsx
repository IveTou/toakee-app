import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Zoom } from 'material-ui';

import { withArrowStyle } from './styles';

const icons = {
  left: <Icon>chevron_left</Icon>,
  right: <Icon>chevron_right</Icon>,
  up: <Icon>expand_less</Icon>,
  down: <Icon>expand_more</Icon>,
};

const EventListArrow = ({ classes, onClick, direction, hide }) => (
  <Zoom in={!hide}>
    <Button
      className={`${classes.root} ${classes[direction]}`}
      onClick={onClick}
      color="primary"
      variant="fab"
    >
      {icons[direction]}
    </Button>
  </Zoom>
);

EventListArrow.propTypes = {
  classes: PropTypes.object,
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  hide: PropTypes.bool,
};

export default withArrowStyle(EventListArrow);
