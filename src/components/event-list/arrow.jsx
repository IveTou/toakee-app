import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '~/src/components/icon';

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
    <Icon icon={`caret-${direction}`} />
  </button>
);

EventListArrow.propTypes = {
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  hide: PropTypes.bool,
};

export default EventListArrow;
