import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Event from '~/src/components/event';

export const Container = ({ viewer }) => {
  declare var event;
  declare var idx;

  return (
    <div className="Container">
      <For each="event" index="idx" of={viewer.events.edges}>
        <Event key={idx} {...event.node} />
      </For>
    </div>
  );
};

Container.propTypes = {
  viewer: PropTypes.object.isRequired,
};

export default Relay.createContainer(Container, {
  initialVariables: {
    start: new Date(),
    end: new Date(),
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Profile {
        events(start: $start, end: $end, first: 10) {
          edges {
            node {
              title
            }
          }
        }
      }
    `,
  },
});
