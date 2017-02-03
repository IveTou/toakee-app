import React, { PropTypes } from 'react';
import { RootContainer } from 'react-relay';
import EventListRoute from './route';
import Container from './container';

const EventList = ({ title, start, end }) => (
  <div className="EventList">
    <h3>{title}</h3>
    <RootContainer
      Component={Container}
      route={new EventListRoute({ start, end })}
    />
  </div>
);

EventList.propTypes = {
  title: PropTypes.string.isRequired,
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired,
};

export default EventList;
