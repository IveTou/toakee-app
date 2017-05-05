import React, { PropTypes } from 'react';
import classNames from 'classnames';

const buildClasses = ({ direction, hide }) => classNames(
  'EventListArrow',
  `EventListArrow--${direction}`,
  { 'EventListArrow--hidden': hide },
);

const EventListArrow = ({ onClick, direction, hide }) => (
  <button
    role="button"
    className={buildClasses({ direction, hide })}
    onClick={onClick}
  >
    <i className={`fa fa-caret-${direction}`} />
  </button>
);

EventListArrow.propTypes = {
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  hide: PropTypes.bool,
};

export default EventListArrow;
