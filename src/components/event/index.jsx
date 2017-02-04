import React, { PropTypes } from 'react';
import { RootContainer } from 'react-relay';

import Container from './container';
import EventRoute from './route';

const Event = ({ params: { slug } }) => (
  <RootContainer
    Component={Container}
    route={new EventRoute({ slug })}
  />
);

Event.propTypes = {
  params: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export default Event;
