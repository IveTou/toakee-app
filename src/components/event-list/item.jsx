import React, { PropTypes } from 'react';

const EventListItem = ({ title }) => (
  <div className="EventListItem">{title}</div>
);

EventListItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default EventListItem;
