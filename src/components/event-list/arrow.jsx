import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from 'semantic-ui-react';

const buildClasses = ({ direction, hide }) => classNames(
  'EventListArrow',
  `EventListArrow--${direction}`,
  { 'EventListArrow--hidden': hide },
);

const EventListArrow = ({ onClick, direction, hide }) => (
  <Icon
    bordered
    inverted
    link
    color="orange"
    className={buildClasses({ direction, hide })}
    onClick={onClick}
    name={`caret ${direction}`}
    size="huge"
  />
);

EventListArrow.propTypes = {
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  hide: PropTypes.bool,
};

export default EventListArrow;
