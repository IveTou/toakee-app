import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Icon } from 'material-ui';

const buildClasses = ({ direction, hide }) => classNames(
  'EventListArrow',
  `EventListArrow--${direction}`,
  { 'EventListArrow--hidden': hide },
);

const EventListArrow = ({ onClick, direction, hide }) => (
  <Button
    variant="fab"
    className={buildClasses({ direction, hide })}
    onClick={onClick}
    zDepth={4}
  >
    {{
      left: (<Icon>chevron_left</Icon>),
      right: (<Icon>chevron_right</Icon>),
      top: (<Icon>expand_less</Icon>),
      bottom: (<Icon>expand_more</Icon>),
    }[direction]}
  </Button>
);

EventListArrow.propTypes = {
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  hide: PropTypes.bool,
};

export default EventListArrow;
