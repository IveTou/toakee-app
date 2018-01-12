import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { FloatingActionButton } from 'material-ui';
import {
  NavigationChevronLeft,
  NavigationChevronRight,
  NavigationExpandLess,
  NavigationExpandMore,
} from 'material-ui/svg-icons';
import { grey200 } from 'material-ui/styles/colors';

const buildClasses = ({ direction, hide }) => classNames(
  'EventListArrow',
  `EventListArrow--${direction}`,
  { 'EventListArrow--hidden': hide },
);

const EventListArrow = ({ onClick, direction, hide }) => (
  <FloatingActionButton
    backgroundColor={grey200}
    className={buildClasses({ direction, hide })}
    onClick={onClick}
    zDepth={4}
  >
    {{
      'left': (<NavigationChevronLeft />),
      'right': (<NavigationChevronRight />),
      'top': (<NavigationExpandLess />),
      'bottom': (<NavigationExpandMore />),
    }[direction]}
  </FloatingActionButton>
);

EventListArrow.propTypes = {
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  hide: PropTypes.bool,
};

export default EventListArrow;
