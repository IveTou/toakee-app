import React, { PropTypes } from 'react';
import Relay from 'react-relay';

import EventBox from '~/src/components/event-box';

const Home = ({ viewer }) => (
  <div><EventBox viewer={viewer} /></div>
);

Home.propTypes = {
  viewer: PropTypes.object.isRequired,
};

export default Relay.createContainer(Home, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Profile {
        ${EventBox.getFragment('viewer')}
      }
    `,
  },
});
