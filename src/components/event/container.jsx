import React, { PropTypes } from 'react';
import Relay from 'react-relay';

export const Container = ({ viewer }) => {
  const { title, description, start } = viewer.event;

  return (
    <div className="Container">
      <h2>{title}</h2>
      <h3>{description}</h3>
      <h3>{start}</h3>
    </div>
  );
};

Container.propTypes = {
  viewer: PropTypes.object.isRequired,
};

export default Relay.createContainer(Container, {
  initialVariables: {
    slug: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Profile {
        event(slug: $slug) {
          title
          description
          start
        }
      }
    `,
  },
});
