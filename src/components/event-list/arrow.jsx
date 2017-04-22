import React, { PropTypes } from 'react';

const EventListArrow = ({ onClick, direction }) => (
  <button role="button" className={`EventListArrow EventListArrow--${direction}`} onClick={onClick}>
    <i className={`fa fa-caret-${direction}`} />
  </button>
);

EventListArrow.propTypes = {
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default EventListArrow;
