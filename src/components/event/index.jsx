import React, { PropTypes } from 'react';

const Event = ({ title }) => (
  <div className="Event">{title}</div>
);

Event.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Event;
