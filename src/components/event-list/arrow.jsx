import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { FloatingActionButton } from 'material-ui';
import { NavigationChevronLeft, NavigationChevronRight } from 'material-ui/svg-icons';
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
    <Choose>
      <When condition={direction === 'left'}><NavigationChevronLeft /></When>
      <Otherwise><NavigationChevronRight /></Otherwise>
    </Choose>
  </FloatingActionButton>
);

EventListArrow.propTypes = {
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  hide: PropTypes.bool,
};

export default EventListArrow;
